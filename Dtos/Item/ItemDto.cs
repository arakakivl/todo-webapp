namespace ToDoApi.Dtos.Item
{
    public record ItemDto
    {
        public Guid Id { get; init; }

        public string? Title { get; init; }
        public string? Description { get; init; }

        public bool IsComplete { get; init; }

        public DateTime CompleteUntil { get; init; }
        public DateTime CreatedAt { get; init; }
    }
}