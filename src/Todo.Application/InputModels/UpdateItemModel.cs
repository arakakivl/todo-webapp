using System.ComponentModel.DataAnnotations;

namespace Todo.Application.InputModels;
public record UpdateItemModel
{
    [Required]
    [MaxLength(50)]
    public string Title { get; init; } = null!;

    [Required]
    public string Description { get; init; } = null!;

    [Required]
    public DateTimeOffset CompleteUntil { get; init; }
}