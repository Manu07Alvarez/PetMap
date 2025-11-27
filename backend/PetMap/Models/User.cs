using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;


namespace PetMap.Models
{
	public class User : IdentityUser
	{
		[PersonalData]
		public string? NameLastName { get; set; }

		public ICollection<PetPost> Pets { get; } = new List<PetPost>();
	}

	public class Role : IdentityRole
	{
	}
}