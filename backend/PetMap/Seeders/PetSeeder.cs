using PetMap.Context;
using Bogus;
using PetMap.Models;
using NetTopologySuite.Geometries;
namespace PetMap.Seeders;

public static class PetSeeder
{
    public static void SeedData(PetMapDbContext context)
    {
        var petsFaker = new Faker<PetPost>(); // Additional configurations can be added here if needed
        var pets = petsFaker
            .RuleFor(p => p.Name, f => f.Person.FirstName)
            .RuleFor(p => p.Description, f => f.Lorem.Sentence())
            .RuleFor(p => p.Contact, f => f.Internet.Email())
            .RuleFor(p => p.Location, f => new Point(f.Random.Double(-180, 180), f.Random.Double(-90, 90)) { SRID = 4326 })
            .RuleFor(p => p.FileKey, f => f.Random.String2(8))
            .Generate(1000);

        context.Pets.AddRange(pets);
        context.SaveChanges();
    }
}