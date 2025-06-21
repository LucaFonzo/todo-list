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
    public class ProjectsController : Controller
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> GetProjects()
        {
            return await _context.Projects
                .Select(x => new ProjectDTO(x.Id, x.Name,x.TodoItem))
                .ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDTO>> GetTodoItem(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return NotFound();

            return new ProjectDTO(project.Id, project.Name, project.TodoItem);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProjectDTO>> PostTodoItem(ProjectDTO projectDTO)
        {
            if (projectDTO == null)
            {
                return BadRequest("TodoItem cannot be null");
            }
            var newProject = new Project(projectDTO.Name);
            newProject.TodoItem = projectDTO.TodoItem;
            await _context.Projects.AddAsync(newProject);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodoItem), new { id = newProject.Id }, new ProjectDTO(newProject.Id, newProject.Name, newProject.TodoItem));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutTodoItem(int id, ProjectDTO projectDTO)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return NotFound();
            project.Name= projectDTO.Name;
            project.TodoItem = projectDTO.TodoItem;
            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodoItem(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return NotFound();
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
