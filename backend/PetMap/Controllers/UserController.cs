namespace Petmap.Controllers
{
	using Microsoft.AspNetCore.Authentication;
	using Microsoft.AspNetCore.Authorization;
	using Microsoft.AspNetCore.Identity;
	using Microsoft.AspNetCore.Mvc;
	using PetMap.Models;

	[ApiController]
	[Route("api/users")]
	[Authorize]
	public class UserController() : ControllerBase
	{
		[HttpPost]
		public async Task<IActionResult> Logout()
		{
			await HttpContext.SignOutAsync("cookie");
			return Redirect("http//localhost:5000/");
		
		[HttpGet]
		public async Task<IActionResult> Login()
		{
			return View();
		}
	}
}