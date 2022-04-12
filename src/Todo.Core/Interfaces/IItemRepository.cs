using Todo.Core.Entities;

namespace Todo.Core.Interfaces;

public interface IItemsRepository
{
    Task AddAsync(Item item);

    Task<Item?> GetAsync(Guid id);

    Task<IEnumerable<Item>> GetAllAsync();
    Task<IEnumerable<Item>> GetUncompletedAsync();
    Task<IEnumerable<Item>> GetCompletedAsync();

    Task UpdateAsync(Guid id, Item item);
    Task DeleteAsync(Guid id);
    Task CheckAsync(Guid id);
}