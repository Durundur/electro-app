using electro.api.rest.Mapper;
using electro.api.rest.Services;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbService(builder.Configuration.GetConnectionString("DB"));

builder.Services.AddJwtAuth(builder.Configuration);

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));
builder.Services.AddAutoMapper(typeof(OrderMapperProfile));
builder.Services.AddAutoMapper(typeof(ProductMapperProfile));
builder.Services.AddAutoMapper(typeof(OpinionMapperProfile));
builder.Services.AddServices();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "allow_cors", builder =>
    {
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
        builder.AllowAnyOrigin();
    });
});
var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("allow_cors");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
//await UserSampleData.SeedUsers(app.Services);
app.Run();
