using PetMap.Context;
using Bogus;
using PetMap.Models;
using NetTopologySuite.Geometries;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
namespace PetMap.Seeders;

public static class PetSeeder
{
	public static async Task SeedData(PetMapDbContext context)
	{
		var rolesFaker = new Faker<Role>();
		var roles = rolesFaker
			.RuleFor(r => r.Name, f => f.PickRandom("Admin", "User", "Moderator"))
			.Generate(3);
		context.Roles.AddRange(roles);
		var usersFaker = new Faker<User>();
		var users = usersFaker
			.RuleFor(u => u.UserName, f => f.Internet.UserName())
			.RuleFor(u => u.Email, f => f.Internet.Email())
			.RuleFor(u => u.Name, f => f.Name.FirstName())
			.RuleFor(u => u.LastName, f => f.Name.LastName())
			.RuleFor(u => u.Disabled, f => f.Random.Bool(0.1f))
			.Generate(50);
		context.Users.AddRange(users);
		context.UserRoles.AddRange(users.Select(u => new UserRoles
		{
			UserId = u.Id,
			RoleId = roles.First().Id
		}));
		context.UserRoles.AddRange(users.Take(5).Select(u => new UserRoles
		{
			UserId = u.Id,
			RoleId = roles.Last().Id
		}));
		var petsFaker = new Faker<PetPost>(); // Additional configurations can be added here if needed
		var pets = petsFaker
			.RuleFor(p => p.Name, f => f.Person.FirstName)
			.RuleFor(p => p.Description, f => f.Lorem.Sentence())
			.RuleFor(p => p.ContactEmail, f => f.Internet.Email())
			.RuleFor(p => p.ContactPhone, f => f.Phone.PhoneNumber())
			.RuleFor(p => p.DatePet, f => f.Date.Past().ToUniversalTime())
			.RuleFor(p => p.TypePet, f => f.PickRandom<byte>(0, 1, 2, 3, 4))
			.RuleFor(p => p.PetStatus, f => f.PickRandom<PetStatus>())
			.RuleFor(p => p.Location, f => new Point(f.Random.Double(-180, 180), f.Random.Double(-90, 90)) { SRID = 4326 })
			.RuleFor(p => p.FileKey, f => f.Random.String2(8))
			.RuleFor(p => p.UserId, f => f.PickRandom(users).Id)
			.Generate(100);
		context.Pets.AddRange(pets);
		await context.SaveChangesAsync();
		Console.WriteLine("Seeded Pet data.");
	}
}