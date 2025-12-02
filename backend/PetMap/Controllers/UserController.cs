namespace Petmap.Controllers
{
	using System.Configuration;
	using Microsoft.AspNetCore.Authentication;
	using Microsoft.AspNetCore.Authorization;
	using Microsoft.AspNetCore.Identity;
	using Microsoft.AspNetCore.Mvc;
	using PetMap.Models;


	[ApiController]
	[Route("api/users")]
	[Authorize]
	public class UserController(UserManager<User> userManager, IConfiguration configuration) : ControllerBase
	{


	
		
		[HttpGet("me")]
		public async Task<IActionResult> GetCurrentUser()
		{
			var user = userManager.GetUserAsync(User).Result;
			if (user == null)
			{
				return NotFound();
			}
			return Ok(new
			{
				user.Id,
				user.Email,
				user.Name,
				user.LastName,
				user.Disabled
			});
		}
		
		[HttpPost("logout")]
		public async Task<IActionResult> Logout()
		{
			await HttpContext.SignOutAsync();
			return Redirect(configuration["frontend:url"] + "/login");
		}
	}
}