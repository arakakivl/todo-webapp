namespace ToDoApi.Dtos.Item
{
    public static class ItemDtoExtension
    {
        public static ItemDto AsDto(this ToDoApi.Entities.Item item)
        {
            /* Formating Dates */
            string createdAt = FormatDate(item.CreatedAt);
            string completeUntil = FormatDate(item.CompleteUntil);

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

        public static string FormatDate(DateTime date)
        {
            string dateString = date.Day.ToString() + "/";

            if (date.Day.ToString().Length == 1)
                dateString = "0" + date.Day + "/";
            if (date.Month.ToString().Length == 1)
                dateString += "0" + date.Month;
            else
                dateString += date.Month;

            return dateString;
        }
    }
}