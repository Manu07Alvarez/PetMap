using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PetMap.Context;
using PetMap.Repositories;
using PetMap.Services;
using PetMap.Config;
using LinqToDB.EntityFrameworkCore;
using PetMap.Services.Auth;
using PetMap.Extensions;
using PetMap.Models;

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
        .MapEnum<PetStatus>("pet_status")
    ));
builder.Services.AuthService();
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

app.MapControllers();
if (app.Environment.IsDevelopment())
{
	Console.WriteLine("Development environment detected. Ensuring database is created...");
	app.ApplyMigrations();
	app.UseSwagger();
	app.UseSwaggerUI(c =>
	{
			c.SwaggerEndpoint("/swagger/v1/swagger.json", "PetMap API V1");
	});


	app.UseExceptionHandler("/error-development");
}
else
{
	app.UseExceptionHandler("/error");
}

app.MapIdentityApi<User>();


await app.RunAsync();
