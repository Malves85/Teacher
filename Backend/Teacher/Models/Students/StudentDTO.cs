using System.ComponentModel.DataAnnotations;
using Teacher.Entity;

namespace Teacher.Models.Students
{
    public class StudentDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public int identification { get; set; }
        public string InitialLevel { get; set; }
        public string CurrentLevel { get; set; }
        public int ClassId { get; set; }

        public StudentDTO() { }

        public StudentDTO(Student student)
        {
            Id = student.Id;
            Name = student.Name;
            Email = student.Email;
            Age = student.Age;
            City = student.City;
            identification = student.identification;
            InitialLevel = student.InitialLevel;
            CurrentLevel = student.CurrentLevel;
            ClassId = student.ClassId;
        }
    }
}
