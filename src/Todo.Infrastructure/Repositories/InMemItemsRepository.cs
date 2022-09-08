using System;
using Todo.Core.Entities;
using Todo.Core.Interfaces;

namespace Todo.Infrastructure.Repositories;

public class InMemItemsRepository : IItemsRepository
{
    private readonly List<Item> _database = new()
    {
        new Item() { Title = "Estudar matemática", Description = "Ler até o volume 3.", IsComplete = false, CompleteUntil = DateTimeOffset.UtcNow.AddDays(5), CreatedAt = DateTimeOffset.UtcNow.AddDays(-5) },
        new Item() { Title = "Exercícios Físicos", IsComplete = true, CompleteUntil = DateTimeOffset.UtcNow },
        new Item() { Title = "Reunião do projeto principal", Description = "Não esquecer de ir de roupa social!", IsComplete = false, CompleteUntil = DateTimeOffset.UtcNow, CreatedAt = DateTimeOffset.UtcNow.AddDays(-7) },
        new Item() { Title = "Consumir HTTP Requests do Freelance", Description = "Cliente: Alex", IsComplete = false, CompleteUntil = DateTimeOffset.UtcNow.AddDays(2) },
        new Item() { Title = "Almoço com os amigos", Description = "Eles são tão chatos que isso é considerado uma tarefa rs rs", IsComplete = false, CompleteUntil = DateTimeOffset.UtcNow, CreatedAt = DateTimeOffset.UtcNow.AddDays(-3) },
        new Item() { Description = "Isso é um teste, por favor desconsidere o tamanho dessa descrição, ela foi feita para ser enorme mesmo. Então, lá vamos nós!", IsComplete = true, CompleteUntil = DateTimeOffset.UtcNow.AddDays(-3), CreatedAt = DateTimeOffset.UtcNow.AddDays(-5) }    
    };

    public async Task AddAsync(Item item)
    {
        _database.Add(item);
        await Task.CompletedTask;
    }

    public async Task<IEnumerable<Item>> GetAllAsync() 
    {
        return await Task.FromResult(_database);
    }

    public async Task<IEnumerable<Item>> GetUncompletedAsync()
    {
        return await Task.FromResult(_database.Where(x => !x.IsComplete));
    }
    
    public async Task<IEnumerable<Item>> GetCompletedAsync()
    {
        return await Task.FromResult(_database.Where(x => x.IsComplete));
    }

    public async Task<Item?> GetAsync(Guid id)
    {
        return await Task.FromResult(_database.Find(x => x.Id == id));
    }

    public async Task UpdateAsync(Guid id, Item item)
    {
        _database[_database.FindIndex(x => x.Id == id)] = item;
        await Task.CompletedTask;
    }

    public async Task DeleteAsync(Guid id)
    {
        _database.RemoveAt(_database.FindIndex(x => x.Id == id));
        await Task.CompletedTask;
    }

    public async Task CheckAsync(Guid id)
    {
        var changing = _database.Find(x => x.Id == id);
        if (changing is null)
            return;
        
        _database[_database.FindIndex(x => x.Id == id)] = changing with
        {
            IsComplete = !changing.IsComplete
        };

        await Task.CompletedTask;
    }
}