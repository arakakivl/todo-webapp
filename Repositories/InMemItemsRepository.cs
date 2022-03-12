using ToDoApi.Entities;

namespace ToDoApi.Repositories
{
    public class InMemItemsRepository : IItemsRepository
    {
        private readonly List<Item> database = new()
        {
            new Item() { Id = Guid.NewGuid(), Title = "Estudar matemática", Description = "Ler até o volume 3.", IsComplete = false, CompleteUntil = DateTime.Today.AddDays(5), CreatedAt = DateTime.Today.AddDays(-5) },
            new Item() { Id = Guid.NewGuid(), Title = "Exercícios Físicos", Description = "", IsComplete = true, CompleteUntil = DateTime.Today, CreatedAt = DateTime.Today },
            new Item() { Id = Guid.NewGuid(), Title = "Reunião do projeto principal", Description = "Não esquecer de ir de roupa social!", IsComplete = false, CompleteUntil = DateTime.Today, CreatedAt = DateTime.Today.AddDays(-7) }
        };

        public void Add(Item item) =>
            database.Add(item);

        public Item? Get(Guid id) =>
            database.Find(x => x.Id == id);

        public IEnumerable<Item> GetAll() =>
            database;

        public void Update(Guid id, Item item) =>
            database[database.FindIndex(x => x.Id == id)] = item;

        public void Delete(Guid id) =>
            database.RemoveAt(database.FindIndex(x => x.Id == id));
    }
}