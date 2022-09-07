using Todo.Application.ViewModels;
using Todo.Core.Entities;

namespace Todo.Application.Extensions;
public static class ItemDtoExtension
{
    public static ItemViewModel AsViewModel(this Item item)
    {
        return new ItemViewModel()
        {
            Id = item.Id,
            Title = item.Title,
            Description = item.Description,
            IsComplete = item.IsComplete,
            CompleteUntil = item.CompleteUntil,
            CreatedAt = item.CreatedAt
        };
    }
}