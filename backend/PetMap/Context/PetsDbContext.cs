using Microsoft.EntityFrameworkCore;
using PetMap.Models;
namespace CSharpCornerApi.Data
{
    public class PetMapDbContext(DbContextOptions<PetMapDbContext> options) : DbContext(options)
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(
            @"Host=myserver;Username=mylogin;Password=mypass;Database=mydatabase",
            o => o.UseNetTopologySuite());

        public DbSet<PetPost> Pets { get; set; }
    }
}