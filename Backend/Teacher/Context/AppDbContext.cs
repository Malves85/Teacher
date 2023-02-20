using Microsoft.EntityFrameworkCore;
using Teacher.Entity;

namespace Teacher.Context
{
    public class AppDbContext : DbContext 
    {
       
        public DbSet<Student> Students { get; set; } = null;
        public DbSet<Class> Classes { get; set; } = null;
        public DbSet<Note> Notes { get; set; } = null;
        public DbSet<Session> Sessions { get; set; } = null;
        public DbSet<Assessment> Assessments { get; set; } = null;
        public DbSet<History> Historys { get; set; } = null;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source = (localdb)\MSSQLLocalDB; Initial Catalog = Teacher; Integrated Security = True;");
        }
        
    }
}
