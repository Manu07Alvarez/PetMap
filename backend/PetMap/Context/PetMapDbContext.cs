using Microsoft.EntityFrameworkCore;
using PetMap.Models;
using Bogus;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace PetMap.Context
{
	public class PetMapDbContext(DbContextOptions<PetMapDbContext> options)
	: IdentityDbContext<User, Role, string>(options)
	{
		public DbSet<PetPost> Pets => Set<PetPost>();
		public DbSet<Tags> Tags => Set<Tags>();

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.EnableSensitiveDataLogging();
		}
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<User>()
			.ToTable("Users");

			modelBuilder.Entity<User>()
			.HasMany(e => e.Pets)
			.WithOne(e => e.User)
			.HasForeignKey(p => p.UserId)
			.OnDelete(DeleteBehavior.SetNull);

			modelBuilder.Entity<PetPost>()
			.ToTable("Pets")
			.Property(p => p.Id)
			.UseIdentityAlwaysColumn();

			modelBuilder.Entity<PetPost>()
			.ToTable("Pets")
			.Property(p => p.UpdatedAt)
			.HasDefaultValueSql("now()");

			modelBuilder.Entity<PetPost>()
			.ToTable("Pets")
			.Property(p => p.CreateAt)
			.HasDefaultValueSql("now()");

			modelBuilder.Entity<PetPost>()
			.HasIndex(p => p.Tags)
			.HasMethod("gin");

			modelBuilder.Entity<Tags>().ToTable("Pet_Tags");


			
					
		}


	}
}