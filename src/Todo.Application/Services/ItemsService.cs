using Todo.Core.Interfaces;
using Todo.Application.Extensions;
using Todo.Application.InputModels;
using Todo.Application.ViewModels;
using Todo.Core.Entities;

namespace Todo.Application.Services;

public class ItemsService : IItemsService
{
    private readonly IItemsRepository _repository;

    public ItemsService (IItemsRepository repository)
    {
        _repository = repository;
    }

    public async Task<Guid> AddAsync(CreateItemModel item)
    {
        Item toAdd = new Item() 
        {
            Title = item.Title,
            Description = item.Description,
            IsComplete = false,
            CompleteUntil = item.CompleteUntil.AddHours(3)
        };

        await _repository.AddAsync(toAdd);
        return toAdd.Id;
    }

    public async Task<IEnumerable<ItemViewModel>> GetAllAsync()
    {
        return (await _repository.GetAllAsync()).Select(x => x.AsViewModel());
    }

    public async Task<IEnumerable<ItemViewModel>> GetUncompletedAsync()
    {
        return (await _repository.GetAllAsync()).Where(x => !x.IsComplete).Select(x => x.AsViewModel());
    }

    public async Task<IEnumerable<ItemViewModel>> GetCompletedAsync()
    {
        return (await _repository.GetAllAsync()).Where(x => x.IsComplete).Select(x => x.AsViewModel());
    }

    public async Task<ItemViewModel?> GetAsync(Guid id)
    {
        return (await _repository.GetAsync(id))?.AsViewModel();
    }

    public async Task UpdateAsync(Guid id, UpdateItemModel item)
    {
        var toUpdate = await _repository.GetAsync(id);
        if (toUpdate is null)
            return;
        
        var updated = toUpdate with 
        {
            Title = item.Title,
            Description = item.Description,
            CompleteUntil = item.CompleteUntil
        };

        await _repository.UpdateAsync(id, updated);
        await Task.CompletedTask;
    }

    public async Task CheckAsync(Guid id)
    {
        await _repository.CheckAsync(id);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }
}