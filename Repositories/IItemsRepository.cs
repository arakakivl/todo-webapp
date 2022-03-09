using ToDoApi.Entities;

namespace ToDoApi.Repositories
{
    public interface IItemsRepository
    {
        void Add(Item item);

        Item? Get(Guid id);
        IEnumerable<Item> GetAll();

        void Update(Guid id, Item item);
        void Delete(Guid id);
    }
}