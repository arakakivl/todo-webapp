using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

using Todo.Api.Settings;
using Todo.Application.Services;
using Todo.Core.Interfaces;
using Todo.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

BsonSerializer.RegisterSerializer(new GuidSerializer(BsonType.String));
BsonSerializer.RegisterSerializer(new DateTimeOffsetSerializer(BsonType.String));

builder.Services.AddSingleton<IMongoClient>(provider => {
    var settings = builder.Configuration.GetSection(nameof(MongoDbSettings)).Get<MongoDbSettings>();
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddSingleton<IItemsRepository, ItemsRepository>();
builder.Services.AddSingleton<IItemsService, ItemsService>();
builder.Services.AddControllersWithViews(options => {
    options.SuppressAsyncSuffixInActionNames = false;
});

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();

app.UseStaticFiles();

app.Run();