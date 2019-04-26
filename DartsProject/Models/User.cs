using DartsProject.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DartsProject.Models
{
	public class User
	{
		private string _login;
		private string _password;

		public Guid Id { get; set; }
		public int WinCount { get; private set; }
		public int WinCountInSeason { get; private set; }
		public int GameCount { get; private set; }
		public int GameSeasonCount { get; private set; }
		public int FastWin { get; private set; }
		public int BestScore { get; private set; }
		public string Name { get; private set; }
		public Guid ImageId { get; private set; }
		public string Synonym { get; private set; }
		public int Rate { get; private set; }

		public User(string login)
		{
			_login = login;
		}

		public User(Guid id)
		{
			Id = id;
			LoadInfo();
		}

		private void LoadInfo()
		{
			using (var provider = new DBConnectionProvider())
			{
				using (var reader = provider.Execute("Select Name, [imageId], synonym, Rate from [User] WITH(NOLOCK) Where Id = '{0}'", Id.ToString()))
				{
					if (reader != null && reader.Read())
					{
						Name = reader.GetValue("Name", String.Empty);
						ImageId = reader.GetValue("ImageId", Guid.Empty);
						Synonym = reader.GetValue("synonym", String.Empty);
						Rate = Convert.ToInt32(reader.GetValue("Rate", Decimal.Zero));
					}
				}
			}
			WinCount = GetWinGameCount(true);
			WinCountInSeason = GetWinGameCount(false);
			GameCount = GetGameCount(true);
			GameSeasonCount = GetGameCount(false);
			FastWin = GetFastWin();
			BestScore = GetBestScore();
		}

		private int GetBestScore()
		{
			return DBConnectionProvider.ExecuteScalar(@"Select MAX(t.Score) from (Select SUM(score*st.Multiplier) as Score from Shot s
															join ScoreType st on st.Id = s.ScoreTypeId
															Where s.UserId = '{0}'
															group by s.GameId, s.UserId, s.LegNumber) t", 0, Id);
		}

		private int GetFastWin()
		{
			return DBConnectionProvider.ExecuteScalar("Select MIN(CurrentLeg) from Game Where WinnerId = '{0}'", 0, Id);
		}

		public bool IsExistsInDB()
		{
			if (String.IsNullOrEmpty(_login)) return false;
			var userCount = DBConnectionProvider.ExecuteScalar<int>("Select COUNT(1) from [User] Where Login = '{0}'", 0, _login);

			if (userCount == 1)
			{
				return true;
			}

			return false;
		}

		public bool IsPasswordValid(string password)
		{
			var hash = GetHash(password);
			return !String.IsNullOrEmpty(password) && hash == _password;
		}

		private string GetHash(string password)
		{
			var bytes = System.Text.Encoding.UTF8.GetBytes(password);
			var hash = Convert.ToBase64String(bytes);
			var result = String.Empty;
			for (int i = 0; i < hash.Length; i++)
			{
				result += hash[i] + 1;
			}

			return result;
		}

		private int GetGameCount(bool isAllSeason)
		{
			if (isAllSeason) return DBConnectionProvider.ExecuteScalar(@"Select COUNT(1) from Game g join UserInGame uig on uig.GameId = g.Id and uig.UserId = '{0}'
				Where g.IsActive = 1", 0, Id.ToString());
			return DBConnectionProvider.ExecuteScalar(@"Select COUNT(1) from Game g join UserInGame uig on uig.GameId = g.Id and uig.UserId = '{0}'
Where g.IsActive = 1 and g.Season = (Select TOP(1) Id from Season Where IsActive = 1 order by startDate desc)", 0, Id.ToString());
		}

		private int GetWinGameCount(bool isAllSeason)
		{
			if(isAllSeason) return DBConnectionProvider.ExecuteScalar("Select COUNT(1) from Game Where WinnerId = '{0}'", 0, Id.ToString());
			return DBConnectionProvider.ExecuteScalar("Select COUNT(1) from Game Where Season = (Select TOP(1) Id from Season Where IsActive = 1 order by startDate desc) and WinnerId = '{0}'", 0, Id.ToString());
		}

		internal void Create(string password, string synonym, string userName)
		{
			DBConnectionProvider.ExecuteNonQuery("Insert into [User](Name, Rate, IsActive, Synonym, Password, Login) VALUES('{0}', 2000, 1, '{1}', '{2}', '{3}')", userName, synonym.Substring(0, 2).ToUpper(), GetHash(password), _login);
		}

		internal void Load()
		{
			using (var provider = new DBConnectionProvider())
			{
				using (var reader = provider.Execute(@"Select Password, Id from [User] Where Login = '{0}'", _login))
				{
					if (reader != null && reader.Read())
					{
						_password = reader.GetValue("Password", String.Empty);
						Id = reader.GetValue("Id", Guid.Empty);
					}
				}
			}
		}
	}
}
