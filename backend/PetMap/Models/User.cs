using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;


namespace PetMap.Models
{
	public class User : IdentityUser
	{
		[PersonalData]
		public string Name { get; set; } = null!;
		[PersonalData]
		public string LastName { get; set; } = null!;
		public bool Disabled { get; set; } = false;
		public List<PetPost> Pets { get; } = [];
		public List<Role> Roles { get; } = [];
	}

	public class Role : IdentityRole
	{
		public List<User> Users { get; } = [];
	}

	public class UserRoles : IdentityUserRole<string>
	{
		public virtual User User { get; set; } = null!;
		public virtual Role Role { get; set; } = null!;
	}

}