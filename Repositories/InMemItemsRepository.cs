using ToDoApi.Entities;

namespace ToDoApi.Repositories
{
    public class InMemItemsRepository : IItemsRepository
    {
        private readonly List<Item> database = new()
        {
            new Item() { Id = Guid.NewGuid(), Title = "Estudar matemática", Description = "Ler até o volume 3.", IsComplete = false, CompleteUntil = DateTime.Today.AddDays(5), CreatedAt = DateTime.Today.AddDays(-5) },
            new Item() { Id = Guid.NewGuid(), Title = "Exercícios Físicos", Description = "", IsComplete = true, CompleteUntil = DateTime.Today, CreatedAt = DateTime.Today },
            new Item() { Id = Guid.NewGuid(), Title = "Reunião do projeto principal", Description = "Não esquecer de ir de roupa social!", IsComplete = false, CompleteUntil = DateTime.Today, CreatedAt = DateTime.Today.AddDays(-7) },
            new Item() { Id = Guid.NewGuid(), Title = "Consumir HTTP Requests do Freelance", Description = "Cliente: Alex", IsComplete = false, CompleteUntil = DateTime.Today.AddDays(2), CreatedAt = DateTime.Today },
            new Item() { Id = Guid.NewGuid(), Title = "Almoço com os amigos", Description = "Eles são tão chatos que isso é considerado uma tarefa rs rs", IsComplete = false, CompleteUntil = DateTime.Today, CreatedAt = DateTime.Today.AddDays(-3) },
            new Item() { Id = Guid.NewGuid(), Title = "Isso aqui é um teste, Por favor, xxx!", Description = "Isso é um teste, por favor desconsidere o tamanho dessa descrição, ela foi feita para ser enorme mesmo. Então, lá vamos nós!", IsComplete = true, CompleteUntil = DateTime.Today.AddDays(-3), CreatedAt = DateTime.Today.AddDays(-5) }    
        };

        public async Task AddAsync(Item item)
        {
            database.Add(item);
            await Task.CompletedTask;
        }

        public async Task<Item?> GetAsync(Guid id) =>
            await Task.FromResult(database.Find(x => x.Id == id));

        public async Task<IEnumerable<Item>> GetAllAsync() =>
            await Task.FromResult(database);

        public async Task UpdateAsync(Guid id, Item item)
        {
            database[database.FindIndex(x => x.Id == id)] = item;
            await Task.CompletedTask;
        }
            

        public async Task DeleteAsync(Guid id)
        {
            database.RemoveAt(database.FindIndex(x => x.Id == id));
            await Task.CompletedTask;
        }
            
    }
}