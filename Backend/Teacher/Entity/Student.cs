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
        public int AssessmentId { get; set; }
        public Assessment Assessment { get; set; } = null!;
        public int NoteId { get; set; }
        public Note Note { get; set; } = null!;

    }
}
