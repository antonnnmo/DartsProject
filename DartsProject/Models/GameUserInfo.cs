using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DartsProject.Models
{
	public class GameUserInfo
	{
		public int Score { get; set; }
		public int Position { get; set; }
		public string Name { get; set; }
		public Guid Id { get; set; }
		public String Image { get; set; }
		public string Synonym { get; internal set; }
	}
}
