using ToDoApi.Entities;

namespace ToDoApi.Repositories
{
    public interface IItemsRepository
    {
        Task AddAsync(Item item);

        Task<Item?> GetAsync(Guid id);
        Task<IEnumerable<Item>> GetAllAsync();

        Task UpdateAsync(Guid id, Item item);
        Task DeleteAsync(Guid id);
    }
}