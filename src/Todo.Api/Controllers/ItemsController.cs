using Microsoft.AspNetCore.Mvc;
using Todo.Application.InputModels;
using Todo.Application.Services;
using Todo.Application.ViewModels;

namespace Todo.Api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly IItemsService _service;
    public ItemsController(IItemsService service)
    {
        _service = service;
    }

    // POST => /api/items
    [HttpPost]
    public async Task<ActionResult<ItemViewModel>> CreateAsync(CreateItemModel item)
    {
        var itemId = await _service.AddAsync(item);
        return CreatedAtAction(nameof(GetAsync), new { id = itemId }, _service.GetAsync(itemId));
    }

    // GET => /api/items/id
    [HttpGet("{id}")]
    [ActionName("GetAsync")]
    public async Task<ActionResult<ItemViewModel>> GetAsync([FromRoute] Guid id)
    {
        var found = await _service.GetAsync(id);
        if (found is null)
            return NotFound();

        return found;
    }

    // GET => /api/items
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemViewModel>>> GetAllAsync([FromQuery] string? state)
    {
        if (state is null)
            return Ok(await _service.GetAllAsync());
        
        switch (state.ToUpper())
        {
            case "UNCOMPLETED":
                return Ok(await _service.GetUncompletedAsync());
            case "COMPLETED":
                return Ok(await _service.GetCompletedAsync());
            default:
                return BadRequest();
        }
    }

    // PUT => /api/items/id
    [HttpPut("{id}")]
    public async Task<ActionResult> PutAsync([FromRoute] Guid id, UpdateItemModel updatedInfo)
    {
        var toUpdate = await _service.GetAsync(id);
        if (toUpdate is null)
            return NotFound();

        await _service.UpdateAsync(id, updatedInfo);
        return NoContent();
    }

    // Delete => /api/items/id
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAsync([FromRoute] Guid id)
    {
        var toUpdate = await _service.GetAsync(id);
        if (toUpdate is null)
            return NotFound();

        await _service.DeleteAsync(id);
        return NoContent();
    }

    // Patch => /api/items/id/check
    [HttpPatch("{id}")]
    public async Task<ActionResult> CheckItemAsync([FromRoute] Guid id)
    {
        var toCheckOrUncheck = await _service.GetAsync(id);
        if (toCheckOrUncheck is null)
            return NotFound();
    
        await _service.CheckAsync(id);
        return NoContent();
    }
}