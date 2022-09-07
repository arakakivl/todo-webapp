namespace Todo.Application.ViewModels;
public record ItemViewModel
{
    public Guid Id { get; init; }

    public string Title { get; init; } = null!;
    public string Description { get; init; } = null!;

    public bool IsComplete { get; init; }

    public DateTimeOffset CompleteUntil { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
}