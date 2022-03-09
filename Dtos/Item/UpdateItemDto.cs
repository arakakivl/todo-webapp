using System.ComponentModel.DataAnnotations;

namespace ToDoApi.Dtos.Item
{
    public record UpdateItemDto
    {
        [Required]
        [MaxLength(50)]
        public string? Title { get; init; }

        [MaxLength(200)]
        public string? Description { get; init; }

        public DateTime CompleteUntil { get; init; }
        public bool IsComplete { get; init; }
    }
}