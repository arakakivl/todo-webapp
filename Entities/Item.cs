using System;

namespace ToDoApi.Entities
{
    public record Item
    {
        public Guid Id { get; init; }

        public string? Title { get; init; }
        public string? Description { get; init; }

        public bool IsComplete { get; init; }

        public DateTimeOffset CompleteUntil { get; init; }
        public DateTimeOffset CreatedAt { get; init; }
    }
}