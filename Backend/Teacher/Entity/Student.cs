using System.ComponentModel.DataAnnotations;

namespace Teacher.Entity
{
    public class Student
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string City { get; set; }
        public int identification { get; set; }
        public string InitialLevel { get; set; }
        public string CurrentLevel { get; set; }
        public ICollection<Assessment> Assessments { get; set; }
        public ICollection<Note> Notes { get; set; }
        public int ClassId { get; set; }
        public Class Class { get; set; } = null!;

    }
}
