using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DartsProject.Models
{
	public class GameInfo
	{
		public int Number { get; set; }
		public Guid GameId { get; set; }
		public List<GameUserInfo> Users { get; set; }
		public List<ShotInfo> Shots { get; set; }
		public Guid CurrentUserId { get; internal set; }
		public int CurrentShot { get; internal set; }
		public int CurrentLeg { get; internal set; }
		public int CurrentTempScore { get; internal set; }

		public GameInfo()
		{
			Users = new List<GameUserInfo>();
			Shots = new List<ShotInfo>();
		}
	}
}
