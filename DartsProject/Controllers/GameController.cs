using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DartsProject.Models;
using DartsProject.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DartsProject.Controllers
{
	public class CreateGameRequest
	{
		[JsonProperty("users")]
		public string[] Users { get; set; }
	}

	public class ShotRequest
	{
		public int Score { get; set; }
		public int ScoreType { get; set; }
		public Guid GameId { get; set; }
	}

	public class ShotResponse
	{
		public int Result { get; set; }
		public Guid NextPlayer { get; internal set; }
		public int Score { get; internal set; }
		public int OldScore { get; internal set; }
		public int LegIncrement { get; internal set; }
	}

	[Route("api/Game")]
    [ApiController]
    public class GameController : ControllerBase
    {
		[HttpGet]
		public GameInfo GetGame()
		{
			var gameInfo = new GameInfo();

			using (var provider = new DBConnectionProvider())
			{
				using (var reader = provider.Execute(@"Select g.Id as GameId, g.Number, u.Name, u.Id as UserId, uig.Position, g.CurrentUserId, uig.CurrentScore, g.currentLeg, uig.CurrentShot from Game g
							join UserInGame uig on uig.GameId = g.Id
							join[User] u on u.Id = uig.UserId
							Where g.isActive = 1 order by g.startDate desc"))
				{
					while (reader != null && reader.Read())
					{
						gameInfo.GameId = reader.GetValue("GameId", Guid.Empty);
						gameInfo.Number = reader.GetValue("Number", 0);
						gameInfo.CurrentUserId = reader.GetValue("CurrentUserId", Guid.Empty);
						gameInfo.CurrentShot = reader.GetValue("CurrentShot", 0);
						gameInfo.CurrentLeg = reader.GetValue("CurrentLeg", 0);
						gameInfo.Users.Add(new GameUserInfo() {
							Name = reader.GetValue("Name", String.Empty),
							Score = reader.GetValue("CurrentScore", 0),
							Id = reader.GetValue("UserId", Guid.Empty)
						});
					}
				}
			}

			if (gameInfo.Users.Count == 0) return gameInfo;

			var currentUserScore = gameInfo.Users.Where(u => u.Id == gameInfo.CurrentUserId).First().Score;

			gameInfo.CurrentTempScore = currentUserScore - GetShotSum(gameInfo.GameId, gameInfo.CurrentLeg, gameInfo.CurrentUserId);

			return gameInfo;
		}

		[HttpPost]
		[Route("shot")]
		public ShotResponse Shot([FromBody]ShotRequest request)
		{
			var currentShot = 0;
			var currentScore = -1;
			var currentLeg = -1;
			var position = -1;
			var userId = Guid.Empty;
			using (var provider = new DBConnectionProvider())
			{
				using (var reader = provider.Execute(@"Select uig.CurrentShot, uig.CurrentScore, uig.UserId, g.CurrentLeg, uig.Position from UserInGame uig
																	join Game g on g.currentUserId = uig.UserId
																	Where GameId = '{0}'", request.GameId.ToString()))
				{
					if (reader != null && reader.Read())
					{
						currentShot = reader.GetValue("CurrentShot", 0);
						currentScore = reader.GetValue("CurrentScore", -1);
						currentLeg = reader.GetValue("CurrentLeg", -1);
						position = reader.GetValue("Position", -1);
						userId = reader.GetValue("UserId", Guid.Empty);
					}
				}
			}

			if (currentShot != 0)
			{
				currentScore -= GetShotSum(request.GameId, currentLeg, userId);
			}

			if (currentScore == request.Score * request.ScoreType && request.ScoreType != 1)
			{
				WinGame(request, userId);
				return new ShotResponse() { Result = 1 };
			}
			else
			{
				DBConnectionProvider.ExecuteNonQuery("Insert into Shot(GameId, UserId, legNumber, score, scoreTypeId) VALUES('{0}', '{1}', {2}, {3}, '{4}')",
						request.GameId.ToString(), userId.ToString(), currentLeg.ToString(), request.Score.ToString(), GetScoreTypeId(request.ScoreType).ToString());

				if (currentScore <= request.Score * request.ScoreType + 1)
				{
					MarkShotsAsOverhead(request.GameId, userId, currentLeg);
					return MoveToNextPlayer(request.GameId, userId, position);
				}
				else
				{
					if (currentShot == 2)
					{
						if (currentLeg == 15 && IsLastPlayer(request.GameId, userId))
						{
							DBConnectionProvider.ExecuteNonQuery("Update Game Set currentUserId = null, currentLeg = 16 Where Id = '{0}'", request.GameId.ToString());
							return new ShotResponse() { Result = 0 };
						}
						else
						{
							currentLeg++;
						}

						DBConnectionProvider.ExecuteNonQuery("Update UserInGame Set currentScore = {0} Where GameId = '{1}' and UserId = '{2}'",
							(currentScore - (request.Score * request.ScoreType)).ToString(), request.GameId.ToString(), userId.ToString());

						return MoveToNextPlayer(request.GameId, userId, position);
					}
					else
					{
						DBConnectionProvider.ExecuteNonQuery("Update UserInGame Set currentShot = currentShot + 1 Where GameId = '{0}' and UserId = '{1}'",
							request.GameId.ToString(), userId.ToString());
						return new ShotResponse() { Result = 0, Score = currentScore - request.Score*request.ScoreType };
					}
				}
			}
		}

		private int GetPlayerScore(Guid gameId, Guid nextPlayer)
		{
			return DBConnectionProvider.ExecuteScalar(@"Select currentScore from UserInGame Where gameId = '{0}' and userId = '{1}'", 501, gameId.ToString(), nextPlayer.ToString());
		}

		private int GetShotSum(Guid gameId, int currentLeg, Guid userId)
		{
			return DBConnectionProvider.ExecuteScalar(@"Select SUM(score*st.Multiplier) from Shot s
									join ScoreType st on st.Id = s.ScoreTypeId
									Where GameId = '{0}' and UserId = '{1}' and legNumber = {2} and s.IsOverhead = 0", 0, gameId.ToString(), userId.ToString(), currentLeg.ToString());
		}

		private bool IsLastPlayer(Guid gameId, Guid userId)
		{
			throw new NotImplementedException();
		}

		private void MarkShotsAsOverhead(Guid gameId, Guid userId, int currentLeg)
		{
			DBConnectionProvider.ExecuteNonQuery("Update Shot Set isOverhead = 1 Where GameId = '{0}' and UserId = '{1}' and legNumber = {2}", gameId.ToString(), userId.ToString(), currentLeg.ToString());
		}

		private ShotResponse MoveToNextPlayer(Guid gameId, Guid userId, int position)
		{
			var nextUserId = DBConnectionProvider.ExecuteScalar("Select TOP(1) UserId from UserInGame Where Position > {1} and GameId = '{0}' order by Position asc", Guid.Empty, gameId.ToString(), position.ToString());
			var legIncrement = 0;

			if (nextUserId == Guid.Empty)
			{
				nextUserId = DBConnectionProvider.ExecuteScalar("Select TOP(1) UserId from UserInGame Where Position = 1 and GameId = '{0}' order by Position asc", Guid.Empty, gameId.ToString());
				legIncrement = 1;
			}

			DBConnectionProvider.ExecuteNonQuery("Update Game Set currentUserId = '{0}', currentLeg = currentLeg + {2} Where Id = '{1}'", nextUserId.ToString(), gameId.ToString(), legIncrement.ToString());
			DBConnectionProvider.ExecuteNonQuery("Update UserInGame Set currentShot = 0 Where GameId = '{0}' and UserId = '{1}'", gameId.ToString(), userId.ToString());

			return new ShotResponse() { Result = 2, NextPlayer = nextUserId, OldScore = GetPlayerScore(gameId, userId), Score = GetPlayerScore(gameId, nextUserId), LegIncrement = legIncrement };
		}

		private string GetScoreTypeId(int scoreType)
		{
			switch (scoreType)
			{
				case 1: return "DC7EABF5-0B5B-4F81-8B27-2DA5EC4E08EB";
				case 2: return "439229FE-9E36-4F3F-BF56-5C0B82B9B266";
				case 3: return "E8F75A5C-EBAA-4389-8175-0C98D2711C9D";
				default: return "DC7EABF5-0B5B-4F81-8B27-2DA5EC4E08EB";
			}
		}

		private void WinGame(ShotRequest request, Guid userId)
		{
			DBConnectionProvider.ExecuteNonQuery("Update Game Set isActive = 0, endDate = GETUTCDATE(), winnerId = '{0}', winnerScore = '{1}', winnerScoreTypeId = '{2}'", userId.ToString(), request.Score.ToString(), GetScoreTypeId(request.ScoreType));
		}

		[HttpPost]
		[Route("create")]
		public int CreateGame([FromBody]CreateGameRequest request)
		{
			if (request.Users == null) return -1;

			if (request.Users.Count() > 5 || request.Users.Count() < 2) return -2;

			var number = 1;
			var numberStr = DBConnectionProvider.ExecuteScalar("Select value from Setting WITH(NOLOCK) Where ID = '52EAB6BB-95C6-4F74-810C-791D3340EF3A'", String.Empty);

			if (!String.IsNullOrEmpty(numberStr))
			{
				number = Convert.ToInt32(numberStr) + 1;
				DBConnectionProvider.ExecuteNonQuery("Update Setting Set value='{0}' Where ID = '52EAB6BB-95C6-4F74-810C-791D3340EF3A'", number.ToString());
			}

			var gameId = Guid.NewGuid();
			Random rnd = new Random();
			var users = request.Users.OrderBy(x => rnd.Next()).ToArray();

			DBConnectionProvider.ExecuteNonQuery("Insert into Game(id, isActive, currentUserId, season) Select TOP(1) '{0}', 1, '{1}', id from Season WITH(NOLOCK) Where isActive = 1 order by StartDate desc",
				gameId.ToString(), users.First().ToString());

			for (var i = 0; i < users.Count(); i++)
			{
				DBConnectionProvider.ExecuteNonQuery("Insert into UserInGame(userId, gameId, position, currentScore) VALUES('{0}', '{1}', {2}, 301)", users[i].ToString(), gameId.ToString(), (i + 1).ToString());
			}

			return 0;
		}
    }
}