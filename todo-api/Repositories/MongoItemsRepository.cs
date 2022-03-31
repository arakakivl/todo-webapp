using MongoDB.Bson;
using MongoDB.Driver;
using ToDoApi.Entities;

namespace ToDoApi.Repositories
{
    public class MongoItemsRepository : IItemsRepository
    {
        private readonly IMongoCollection<Item> itemsCollection;
        
        private const string databaseName = "todo";
        private const string collectionName = "items";

        private readonly FilterDefinitionBuilder<Item> filterBuilder = Builders<Item>.Filter;

        public MongoItemsRepository(IMongoClient client)
        {
            IMongoDatabase database = client.GetDatabase(databaseName);
            itemsCollection = database.GetCollection<Item>(collectionName);
        }

        public async Task AddAsync(Item toAdd)
        {
            await itemsCollection.InsertOneAsync(toAdd);
        }

        public async Task<Item?> GetAsync(Guid id)
        {
            // return GetAll().First(x => x.Id == id);
            var filter = filterBuilder.Eq(item => item.Id, id);
            return (await itemsCollection.FindAsync(filter)).SingleOrDefault();
        }

        public async Task<IEnumerable<Item>> GetAllAsync()
        {
            return (await itemsCollection.FindAsync(new BsonDocument())).ToList();
        }

        public async Task UpdateAsync(Guid id, Item item)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            await itemsCollection.ReplaceOneAsync(filter, item);
        }

        public async Task DeleteAsync(Guid id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            await itemsCollection.DeleteOneAsync(filter);
        }
    }
}