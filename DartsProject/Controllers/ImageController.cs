using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DartsProject.Models;
using DartsProject.Providers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DartsProject.Controllers
{
    [Route("api/image")]
    [ApiController]
    public class ImageController : ControllerBase
    {
		[HttpGet]
		[Route("getImage")]
		public ActionResult GetFile([FromQuery]string id)
		{
			using (var provider = new DBConnectionProvider())
			{
				using (var reader = provider.Execute(@"Select Data from Image Where Id = '{0}'", id))
				{
					if (reader != null && reader.Read())
					{
						var data = reader.GetSqlBinary(0);
						return File(data.Value, "image /jpeg");
					}

					return NotFound();
				}
			}
		}

		[Route("AddAvatar")]
		[Authorize]
		[HttpPost]
		public ActionResult AddAvatar(IFormFile file)
		{
			if (file != null)
			{
				var session = new Session(HttpContext);
				DBConnectionProvider.ExecuteNonQuery("Delete from Image Where Id = (Select ImageId from [User] Where Id = '{0}')", session.UserId);
				var imageId = Guid.NewGuid().ToString();
				DBConnectionProvider.UploadFile("Insert into Image(Id, Data) VALUES('{0}', @Data)", file.OpenReadStream(), imageId);
				DBConnectionProvider.ExecuteNonQuery("Update [User] Set ImageId = '{0}' Where Id = '{1}'", imageId, session.UserId);
				return Ok(new { success = true });
			}

			return BadRequest();
		}
	}
}