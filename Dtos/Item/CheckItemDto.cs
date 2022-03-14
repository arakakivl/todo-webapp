using System.ComponentModel.DataAnnotations;

namespace ToDoApi.Dtos.Item
{
    public record CheckItemDto
    {
        public bool IsComplete { get; init; }
    }
}