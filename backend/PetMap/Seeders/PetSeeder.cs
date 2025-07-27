using PetMap.Context;
using Bogus;
using PetMap.Models;
namespace PetMap.Seeders;

public static class PetSeeder
{
    public static void SeedData(PetMapDbContext context)
    {
        var petsFaker = new Faker<PetPost>(); // Additional configurations can be added here if needed
        var pets = petsFaker
            .RuleFor(p => p.Id, f => f.IndexFaker + 1)
            .RuleFor(p => p.Name, f => f.Person.FirstName)
            .RuleFor(p => p.Description, f => f.Lorem.Sentence())
            .RuleFor(p => p.Contact, f => f.Internet.Email())
            .Generate(10);

        context.Pets.AddRange(pets);
        context.SaveChanges();
    }
}