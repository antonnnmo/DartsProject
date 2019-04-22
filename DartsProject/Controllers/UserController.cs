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
    [Route("api/Users")]
    [ApiController]
    public class UserController : ControllerBase
    {
		[HttpGet]
		public List<UserInfo> GetUsers()
		{
			var users = new List<UserInfo>();
			using (var provider = new DBConnectionProvider())
			{
				using (var reader = provider.Execute("Select Id, Name, [image], synonym from [User] WITH(NOLOCK) Where isActive = 1"))
				{
					while (reader != null && reader.Read())
					{
						users.Add(new UserInfo() {
							Name = reader.GetValue("Name", String.Empty),
							Image = reader.GetValue("image", String.Empty),
							Synonym = reader.GetValue("synonym", String.Empty),
							Id = reader.GetValue("Id", Guid.Empty)
						});
					}
				}
			}

			return users;
		}
    }
}