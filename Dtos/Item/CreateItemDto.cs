using System.ComponentModel.DataAnnotations;

namespace ToDoApi.Dtos.Item
{
    public record CreateItemDto
    {
        [Required]
        [Range(0, 50)]
        public string? Title { get; init; }

        [Range(0, 200)]
        public string? Description { get; init; }

        public DateTime CompleteUntil { get; init; }
        public bool IsComplete { get; init; }
    }
}