using Microsoft.EntityFrameworkCore;
using TodoAppApi.Models;

namespace TodoAppApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TodoItem> TodoItem => Set<TodoItem>();
        public DbSet<Project> Projects { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
