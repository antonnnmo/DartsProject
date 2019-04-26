using System.Collections.Generic;

namespace DartsProject.Models
{
	public class LiderInfoSummary
	{
		public List<LiderInfo> Rate { get; set; }
		public List<LiderInfo> WinRate { get; set; }
		public List<LiderInfo> GameCount { get; set; }
		public List<LiderInfo> WinCount { get; set; }
		public List<LiderInfo> Score { get; set; }
	}
}
