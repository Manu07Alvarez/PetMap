using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PetMap.Context;
using PetMap.Repositories;
using PetMap.Seeders;
using PetMap.Services;
using Amazon.S3;
using PetMap.Config;
using System.Runtime.InteropServices;
using LinqToDB.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string"
        + "'DefaultConnection' not found.");
builder.Services.AddDbContext<PetMapDbContext>(options =>
    options
    .UseNpgsql(
        connectionString,
        o => o.UseNetTopologySuite()
        .MapEnum<PetMap.Models.PetStatus>("pet_status")
    ));


builder.Services.AddSingleton(S3Config.CreateS3Client(builder.Configuration));
builder.Services.AddScoped<IFilesRepository, FilesRepository>();
builder.Services.AddScoped<IPetRepository, PetRepository>();
builder.Services.AddScoped<IPetService, PetService>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.NumberHandling =
        System.Text.Json.Serialization.JsonNumberHandling.AllowNamedFloatingPointLiterals;
});
builder.Services.AddSwaggerGen(c =>
{
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "PetMap API", Description = "Busca a tu mascota", Version = "v1" });
});
builder.Services.AddEndpointsApiExplorer();
LinqToDBForEFTools.Initialize();
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PetMapDbContext>();
    
    if (app.Environment.IsDevelopment())
    {
        Console.WriteLine("Development environment detected. Ensuring database is created...");
        try 
        {
            await db.Pets.AnyAsync();
            Console.WriteLine("Database already contains data, skipping creation.");
        } catch 
        {
            await db.Database.EnsureDeletedAsync();
            await db.Database.EnsureCreatedAsync();
            Console.WriteLine("Database created successfully.");
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
