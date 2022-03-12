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
        public ActionResult<ItemDto> Create(CreateItemDto item)
        {
            var toAdd = new Item()
            {
                Id = Guid.NewGuid(),
                Title = item.Title,
                Description = item.Description,
                IsComplete = item.IsComplete,
                CompleteUntil = item.CompleteUntil,
                CreatedAt = DateTime.Today
            };

            _repo.Add(toAdd);
            return CreatedAtAction(nameof(Get), new { id = toAdd.Id }, toAdd.AsDto());
        }

        // GET => /api/items/id
        [HttpGet("{id}")]
        public ActionResult<ItemDto> Get(Guid id)
        {
            var finded = _repo.Get(id);
            if (finded is null)
                return NotFound();
            
            return finded.AsDto();
        }

        // GET => /api/items
        [HttpGet]
        public IEnumerable<ItemDto> GetAll()
        {
            return _repo.GetAll().Select(x => x.AsDto());
        }

        // PUT => /api/items/id
        [HttpPut("{id}")]
        public ActionResult Put(Guid id, UpdateItemDto updatedInfo)
        {
            var toUpdate = _repo.Get(id);
            if (toUpdate is null)
                return NotFound();

            var updated = toUpdate with
            {
                Title = updatedInfo.Title,
                Description = updatedInfo.Description,
                IsComplete = updatedInfo.IsComplete,
                CompleteUntil = updatedInfo.CompleteUntil,
            };

            _repo.Update(id, updated);
            return NoContent();
        }

        // Delete => /api/items/id
        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            var toUpdate = _repo.Get(id);
            if (toUpdate is null)
                return NotFound();
            
            _repo.Delete(id);
            return NoContent();
        }
    }
}