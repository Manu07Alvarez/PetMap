using Microsoft.EntityFrameworkCore;
using PetMap.Context;
using PetMap.Seeders;

namespace PetMap.Extensions
{
	public static class MigrationExtensions
	{
		public async static void ApplyMigrations(this IApplicationBuilder app)
		{
			using IServiceScope scope = app.ApplicationServices.CreateScope();
			using PetMapDbContext db = scope.ServiceProvider.GetRequiredService<PetMapDbContext>();

			Console.WriteLine("Development environment detected. Ensuring database is created...");


			Console.WriteLine("Do you want to delete and recreate the database? (y/n)");
			if (Console.ReadLine() == "y") {
				await db.Database.EnsureDeletedAsync();
				db.Database.Migrate();
				Console.WriteLine("Database created successfully.");
				await PetSeeder.SeedData(db); // solo si está vacía
			}
		}
	}
}