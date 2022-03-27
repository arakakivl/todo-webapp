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

        public void Add(Item toAdd)
        {
            itemsCollection.InsertOne(toAdd);
        }

        public Item? Get(Guid id)
        {
            // return GetAll().First(x => x.Id == id);
            var filter = filterBuilder.Eq(item => item.Id, id);
            return itemsCollection.Find(filter).SingleOrDefault();
        }

        public IEnumerable<Item> GetAll()
        {
            return itemsCollection.Find(new BsonDocument()).ToList();
        }

        public void Update(Guid id, Item item)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            itemsCollection.ReplaceOne(filter, item);
        }

        public void Delete(Guid id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            itemsCollection.DeleteOne(filter);
        }
    }
}