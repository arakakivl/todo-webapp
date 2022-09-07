using Todo.Application.InputModels;
using Todo.Application.ViewModels;

namespace Todo.Application.Services;

public interface IItemsService
{
    Task<Guid> AddAsync(CreateItemModel item);

    Task<IEnumerable<ItemViewModel>> GetAllAsync();
    Task<IEnumerable<ItemViewModel>> GetUncompletedAsync();
    Task<IEnumerable<ItemViewModel>> GetCompletedAsync();

    Task<ItemViewModel?> GetAsync(Guid id);

    Task UpdateAsync(Guid id, UpdateItemModel item);
    Task CheckAsync(Guid id);
    Task DeleteAsync(Guid id);
}