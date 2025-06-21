using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAppApi.Data;
using TodoAppApi.DTOs;
using TodoAppApi.Models;

namespace TodoAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoItemsController : Controller
    {

        private readonly AppDbContext _context;

        public TodoItemsController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDto>>> GetTodoItems()
        {
            return await _context.TodoItem
                .Select(x => new TodoItemDto(x.Id, x.Title, x.IsCompleted,x.ProjectId))
                .ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDto>> GetTodoItem(int id)
        {
            var todo = await _context.TodoItem.FindAsync(id);
            if (todo == null) return NotFound();

            return new TodoItemDto(todo.Id, todo.Title, todo.IsCompleted,todo.ProjectId);
        }

        [Authorize]
        [HttpGet("project/{id}")]
        public async Task<ActionResult<TodoItemDto>> GetTodoItemByProjectId(int id)
        {
            var todos = await _context.TodoItem
                .Where(x => x.ProjectId == id)
                .Select(x => new TodoItemDto(x.Id, x.Title, x.IsCompleted, x.ProjectId))
                .ToListAsync();

            return Ok(todos);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<TodoItemDto>> PostTodoItem(TodoItemDto todoItemDto)
        {
            if (todoItemDto == null)
            {
                return BadRequest("TodoItem cannot be null");
            }
            if (todoItemDto.ProjectId == null)
            {
                return BadRequest("Project cannot be null");
            }
            var newTodoItem = new TodoItem(todoItemDto.Title, todoItemDto.IsCompleted);
            var project = await _context.Projects.FindAsync(todoItemDto.ProjectId);
            if (project == null)
            {
                return NotFound($"Project with ID {todoItemDto.ProjectId} not found");
            }
            newTodoItem.ProjectId = project.Id;
            await _context.TodoItem.AddAsync(newTodoItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodoItem), new { id = newTodoItem.Id }, new TodoItemDto(newTodoItem.Id, newTodoItem.Title, newTodoItem.IsCompleted,newTodoItem.ProjectId));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutTodoItem(int id, TodoItemDto todoItemDto)
        {
            var todo = await _context.TodoItem.FindAsync(id);
            if (todo == null) return NotFound();
            todo.Title = todoItemDto.Title;
            todo.IsCompleted = todoItemDto.IsCompleted;
            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(todoItemDto);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodoItem(int id)
        {
            var todo = await _context.TodoItem.FindAsync(id);
            if (todo == null) return NotFound("No se encontro una tarea con el id: " + id);
            _context.TodoItem.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}