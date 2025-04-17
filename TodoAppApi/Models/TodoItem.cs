using System.ComponentModel.DataAnnotations;

namespace TodoAppApi.Models
{
    public class TodoItem
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        // Clave foránea hacia Project
        public int ProjectId { get; set; }
        // Propiedad de navegación
        public Project Project { get; set; }
        public TodoItem(string? title, bool isCompleted)
        {
            Title = title;
            IsCompleted = isCompleted;
            this.CreatedAt = DateTime.UtcNow;
        }

        
    }
}
