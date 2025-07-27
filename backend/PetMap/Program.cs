using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PetMap.Context;
using PetMap.Repositories;
using PetMap.Seeders;
using PetMap.Services;
using Mapster;
using PetMap.Mappings;


var builder = WebApplication.CreateBuilder(args);
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string"
        + "'DefaultConnection' not found.");
builder.Services.AddDbContext<PetMapDbContext>(options =>
    options.UseNpgsql(
        connectionString,
        o => o.UseNetTopologySuite()));
builder.Services.AddMapster();
MapsterConfig.RegisterMapsterConfiguration(builder.Services);
builder.Services.AddScoped<IPetRepository, PetRepository>();
builder.Services.AddScoped<IPetService, PetService>();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "PetMap API", Description = "Busca a tu mascota", Version = "v1" });
});
builder.Services.AddEndpointsApiExplorer();
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PetMapDbContext>();
    
    if (app.Environment.IsDevelopment())
    {
        if (db.Database.EnsureCreatedAsync().GetAwaiter().GetResult())
        {
            PetSeeder.SeedData(db); // solo si está vacía
        }
    }
}
app.MapControllers();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PetMap API V1");
    });


    app.UseExceptionHandler("/error-development");


}





await app.RunAsync();
