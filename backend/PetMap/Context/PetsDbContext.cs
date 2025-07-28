using Microsoft.EntityFrameworkCore;
using PetMap.Models;
using Bogus;
namespace PetMap.Context
{

    public class PetMapDbContext(DbContextOptions<PetMapDbContext> options)
    : DbContext(options)
    {
        public DbSet<PetPost> Pets => Set<PetPost>();
        public DbSet<Tags> Tags => Set<Tags>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PetPost>()
            .ToTable("Pets")
            .Property(p => p.Id)
            .UseIdentityAlwaysColumn();
            modelBuilder.Entity<PetPost>()
            .HasIndex(p => p.Tags)
            .HasMethod("gin");

            modelBuilder.Entity<Tags>().ToTable("Pet_Tags");
        }


    }
}