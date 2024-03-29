namespace Todo.Core.Entities;

public record Item
{
    public Guid Id { get; init; } = Guid.NewGuid();

    public string Title { get; init; } = "";
    public string Description { get; init; } = "";

    public bool IsComplete { get; init; }

    public DateTimeOffset CompleteUntil { get; init; }
    public DateTimeOffset CreatedAt { get; init; } = DateTimeOffset.UtcNow;
}
