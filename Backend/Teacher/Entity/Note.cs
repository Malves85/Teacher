using System.ComponentModel.DataAnnotations;

namespace Teacher.Entity
{
    public class Note
    {
        public int Id { get; set; }
        [Required]
        [StringLength(300)]
        public string Description { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; } = null!;
    }
}
