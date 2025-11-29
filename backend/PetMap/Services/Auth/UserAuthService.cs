using Microsoft.AspNetCore.Identity;
using PetMap.Context;
using PetMap.Models;

namespace PetMap.Services.Auth
 {
	public static class UserAuthService
	{
		public static IServiceCollection AuthService(this IServiceCollection services)
		{
			services.AddAuthorization();
			services.AddAuthentication()
				.AddCookie(options =>
				{
					options.Cookie.Name = "auth_cookie";
					options.Cookie.HttpOnly = true;
					options.Cookie.SameSite = SameSiteMode.Lax;
					options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
					options.LoginPath = "/api/auth/login";
					options.LogoutPath = "/api/users/logout";
				});
			services.AddIdentityCore<User>(options =>
			{
				options.Password.RequireDigit = true;
				options.Password.RequireLowercase = true;
				options.Password.RequireUppercase = false;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequiredLength = 6;
				options.User.RequireUniqueEmail = true;

				options.SignIn.RequireConfirmedEmail = true;
				
			})
				.AddApiEndpoints()
				.AddRoles<Role>()
				.AddDefaultTokenProviders()
				.AddEntityFrameworkStores<PetMapDbContext>();
			return services;
		}
	}
}