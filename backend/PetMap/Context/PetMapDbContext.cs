using Microsoft.EntityFrameworkCore;
using PetMap.Models;
using Bogus;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
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

			modelBuilder.Entity<IdentityRole>(entity =>
			{
				entity.ToTable(name: "Role");
			});

			modelBuilder.Entity<IdentityUserRole<string>>(entity =>
			{
				entity.ToTable("UserRoles");
				//in case you chagned the TKey type
				//  entity.HasKey(key => new { key.UserId, key.RoleId });
			});

			modelBuilder.Entity<IdentityUserClaim<string>>(entity =>
			{
				entity.ToTable("UserClaims");
			});

			modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
			{
				entity.ToTable("UserLogins");
				//in case you chagned the TKey type
				//  entity.HasKey(key => new { key.ProviderKey, key.LoginProvider });       
			});

			modelBuilder.Entity<IdentityRoleClaim<string>>(entity =>
			{
				entity.ToTable("RoleClaims");
			});

			modelBuilder.Entity<IdentityUserToken<string>>(entity =>
			{
				entity.ToTable("UserTokens");
				//in case you chagned the TKey type
				// entity.HasKey(key => new { key.UserId, key.LoginProvider, key.Name });
			});

			modelBuilder.Entity<User>()
			.HasMany(e => e.Roles)
			.WithMany(e => e.Users)
			.UsingEntity<UserRoles>();

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