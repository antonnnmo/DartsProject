using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DartsProject.Models;
using DartsProject.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DartsProject.Controllers
{
	[Route("api/Liders")]
	[ApiController]
	public class LidersController : ControllerBase
	{
		private static readonly int _topCount = 10;

		[HttpGet]
		public LiderInfoSummary Get()
		{
			var info = new LiderInfoSummary();

			info.Rate = GetRates();

			return info;
		}

		private List<LiderInfo> GetRates()
		{
			var result = new List<LiderInfo>();
			using (var provider = new DBConnectionProvider())
			{
				using (var reader = provider.Execute(@"Select TOP({0}) Id, Name, ImageId, Rate from [User] Where IsActive = 1 order by Rate desc", _topCount))
				{
					while (reader != null && reader.Read())
					{
						var imageId = reader.GetValue("ImageId", Guid.Empty);
						result.Add(new LiderInfo() {
							Image = imageId == Guid.Empty ? String.Empty : imageId.ToString(),
							User = reader.GetValue("Name", String.Empty),
							Value = reader.GetValue("Rate", Decimal.Zero).ToString("#")
						});
					}
				}
			}

			return result;
		}
	}
}