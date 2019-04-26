using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace DartsProject.Models
{
	public class Session
	{
		public string _userId;
		public HttpContext _context;
		private string _contactId;

		public Session(HttpContext context)
		{
			_context = context;
		}

		public string UserId
		{
			get
			{
				if (String.IsNullOrEmpty(_userId))
				{
					if (_context != null)
					{
						var userIdClaims = _context.User.Claims.Where(c => c.Type == "UserId");

						if (userIdClaims.Count() > 0)
						{
							_userId = userIdClaims.First().Value;
						}
					}
				}

				return _userId;
			}
		}
	}
}
