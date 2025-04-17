namespace TodoAppApi.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // Navigation properties
        public ICollection<TodoItem> TodoItem { get; set; } = new List<TodoItem>();
        public Project(string name)
        {
            Name = name;
        }
    }
}
