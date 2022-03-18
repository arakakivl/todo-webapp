namespace ToDoApi.Dtos.Item
{
    public static class ItemDtoExtension
    {
        public static ItemDto AsDto(this ToDoApi.Entities.Item item)
        {
            return new ItemDto()
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
}