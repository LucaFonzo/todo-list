using TodoAppApi.Models;

namespace TodoAppApi.DTOs
{
    public record ProjectDTO(int? Id,string Name,ICollection<TodoItem>? TodoItem);
}
