using Microsoft.AspNetCore.Mvc;
using ToDoApi.Dtos.Item;
using ToDoApi.Entities;
using ToDoApi.Repositories;

namespace ToDoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsRepository _repo;
        public ItemsController(IItemsRepository repo)
        {
            _repo = repo;
        }

        // POST => /api/items
        [HttpPost]
        public async Task<ActionResult<ItemDto>> CreateAsync(CreateItemDto item)
        {
            var toAdd = new Item()
            {
                Id = Guid.NewGuid(),
                Title = item.Title,
                Description = item.Description,
                IsComplete = false,
                CompleteUntil = item.CompleteUntil.AddHours(3),
                CreatedAt = DateTime.Today
            };

            await _repo.AddAsync(toAdd);
            return CreatedAtAction(nameof(GetAsync), new { id = toAdd.Id }, toAdd.AsDto());
        }

        // GET => /api/items/id
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetAsync([FromRoute] Guid id)
        {
            var finded = await _repo.GetAsync(id);
            if (finded is null)
                return NotFound();
            
            return finded.AsDto();
        }

        // GET => /api/items
        [HttpGet]
        public async Task<IEnumerable<ItemDto>> GetAllAsync()
        {
            return (await _repo.GetAllAsync()).Select(x => x.AsDto());
        }

        // GET => /api/items/uncompleted
        [HttpGet("uncompleted")]
        public async Task<IEnumerable<ItemDto>> GetUncompletedAsync()
        {
            return (await _repo.GetAllAsync()).Select(x => x.AsDto()).ToList().FindAll(x => !x.IsComplete);
        }

        // GET => /api/items/completed
        [HttpGet("completed")]
        public async Task<IEnumerable<ItemDto>> GetCompletedAsync()
        {
            return (await _repo.GetAllAsync()).Select(x => x.AsDto()).ToList().FindAll(x => x.IsComplete);
        }

        // PUT => /api/items/id
        [HttpPut("{id}")]
        public async Task<ActionResult> PutAsync([FromRoute] Guid id, UpdateItemDto updatedInfo)
        {
            var toUpdate = await _repo.GetAsync(id);
            if (toUpdate is null)
                return NotFound();

            var updated = toUpdate with
            {
                Title = updatedInfo.Title,
                Description = updatedInfo.Description,
                CompleteUntil = updatedInfo.CompleteUntil.AddHours(3),
            };

            await _repo.UpdateAsync(id, updated);
            return NoContent();
        }

        // Delete => /api/items/id
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync([FromRoute] Guid id)
        {
            var toUpdate = await _repo.GetAsync(id);
            if (toUpdate is null)
                return NotFound();
            
            await _repo.DeleteAsync(id);
            return NoContent();
        }

        // Patch -> /api/items/id/check
        [HttpPatch("{id}/check")]
        public async Task<ActionResult> PatchCheckItemAsync([FromRoute] Guid id, CheckItemDto checkItem)
        {
            var toCheckOrUncheck = await _repo.GetAsync(id);
            if (toCheckOrUncheck is null)
                return NotFound();
            
            var itemTo = toCheckOrUncheck with
            {
                IsComplete = checkItem.IsComplete
            };

            await _repo.UpdateAsync(id, itemTo);
            return NoContent();
        }
    }
}