using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DartsProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace DartsProject.Controllers
{
    [Route("api/Identity")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
		[Route("Register")]
		[HttpPost]
		public async Task<IActionResult> Register([FromBody]IdentityViewModel model)
		{
			var user = new User(model.Name);
			if (String.IsNullOrEmpty(model.Name) || user.IsExistsInDB())
			{
				return Ok(new { isError = true, errorMessage = "Недопустимое имя пользователя. Возможно вы хотели написать frog" + (new Random()).Next(555457) });
			}

			if (String.IsNullOrEmpty(model.Password))
			{
				return Ok(new { isError = true, errorMessage = "А пароль кто за тебя писать будет?" });
			}

			if (String.IsNullOrEmpty(model.Synonym))
			{
				return Ok(new { isError = true, errorMessage = "ТЫ че, ТЫ че. Где кликуха, братаН?" });
			}

			if (String.IsNullOrEmpty(model.UserName))
			{
				return Ok(new { isError = true, errorMessage = "Здравствуй, Anonymous!" });
			}

			user.Create(model.Password, model.Synonym, model.UserName);

			var identity = await GetIdentity(model.Name, user.Id);

			var now = DateTime.UtcNow;
			var jwt = new JwtSecurityToken(
					issuer: "AntonDarts",
					audience: "AntonDarts",
					notBefore: now,
					claims: identity.Claims,
					expires: now.Add(TimeSpan.FromHours(30)),
					signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("fdsfdghfhh5hsdf6koinw45u76k")), SecurityAlgorithms.HmacSha256));

			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			return Ok(new { token = encodedJwt, id = user.Id, isError = false });
		}

		[Route("Token")]
		[HttpPost]
		public async Task<IActionResult> Token([FromBody]IdentityViewModel model)
		{
			var user = new User(model.Name);
			if (user.IsExistsInDB())
			{
				user.Load();
			}
			else
			{
				return Unauthorized();
			}

			if (!user.IsPasswordValid(model.Password))
			{
				return Unauthorized();
			}

			var identity = await GetIdentity(model.Name, user.Id);

			var now = DateTime.UtcNow;
			var jwt = new JwtSecurityToken(
					issuer: "AntonDarts",
					audience: "AntonDarts",
					notBefore: now,
					claims: identity.Claims,
					expires: now.Add(TimeSpan.FromHours(30)),
					signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes("fdsfdghfhh5hsdf6koinw45u76k")), SecurityAlgorithms.HmacSha256));

			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			return Ok(new { token = encodedJwt, id = user.Id});
		}

		private async Task<ClaimsIdentity> GetIdentity(string login, Guid userId)
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimsIdentity.DefaultNameClaimType, login),
				new Claim("UserId", userId.ToString()),
			};
			return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
		}
	}
}