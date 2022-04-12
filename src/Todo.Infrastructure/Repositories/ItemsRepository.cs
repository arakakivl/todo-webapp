using MongoDB.Bson;
using MongoDB.Driver;
using Todo.Core.Entities;
using Todo.Core.Interfaces;

namespace Todo.Infrastructure.Repositories;

public class ItemsRepository : IItemsRepository
{
    private readonly IMongoCollection<Item> _itemsCollection;

    private const string DatabaseName = "todo";
    private const string CollectionName = "items";

    private readonly FilterDefinitionBuilder<Item> _filterBuilder = Builders<Item>.Filter;

    public ItemsRepository(IMongoClient client)
    {
        IMongoDatabase database = client.GetDatabase(DatabaseName);
        _itemsCollection = database.GetCollection<Item>(CollectionName);
    }

    public async Task AddAsync(Item toAdd)
    {
        await _itemsCollection.InsertOneAsync(toAdd);
    }

    public async Task<IEnumerable<Item>> GetAllAsync()
    {
        return (await _itemsCollection.FindAsync(new BsonDocument())).ToList();
    }

    public async Task<IEnumerable<Item>> GetUncompletedAsync()
    {
        var filter = _filterBuilder.Eq(item => item.IsComplete, false);
        return (await _itemsCollection.FindAsync(filter)).ToList();
    }

    public async Task<IEnumerable<Item>> GetCompletedAsync()
    {
        var filter = _filterBuilder.Eq(item => item.IsComplete, true);
        return (await _itemsCollection.FindAsync(filter)).ToList();
    }

    public async Task<Item?> GetAsync(Guid id)
    {
        // return GetAll().First(x => x.Id == id);
        var filter = _filterBuilder.Eq(item => item.Id, id);
        return (await _itemsCollection.FindAsync(filter)).SingleOrDefault();
    }

    public async Task UpdateAsync(Guid id, Item item)
    {
        var filter = _filterBuilder.Eq(i => i.Id, id);
        await _itemsCollection.ReplaceOneAsync(filter, item);
    }

    public async Task DeleteAsync(Guid id)
    {
        var filter = _filterBuilder.Eq(item => item.Id, id);
        await _itemsCollection.DeleteOneAsync(filter);
    }

    public async Task CheckAsync(Guid id)
    {
        var filter = _filterBuilder.Eq(item => item.Id, id);
        var itemToCheck = (await _itemsCollection.FindAsync(filter)).SingleOrDefault();

        var toUpdate = itemToCheck with 
        {
            IsComplete = !itemToCheck.IsComplete
        };

        await _itemsCollection.ReplaceOneAsync(filter, toUpdate);
    }
}