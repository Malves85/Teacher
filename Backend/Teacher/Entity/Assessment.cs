using System.ComponentModel.DataAnnotations;

namespace Teacher.Entity
{
    public class Assessment
    {
        public int Id { get; set; }
        public int OralComprehension { get; set; }
        public int OralWritten { get; set; }
        public int WrittenComprehension { get; set; }
        public int WrittenProduction { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; } = null!;
    }
}
