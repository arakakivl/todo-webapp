using System.ComponentModel.DataAnnotations;

namespace Todo.Application.InputModels;
public record CreateItemModel
{
    [Required]
    [MaxLength(50)]
    public string? Title { get; init; }
    public string? Description { get; init; }

    [Required]
    public DateTimeOffset CompleteUntil { get; init; }
}