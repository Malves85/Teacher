using System.ComponentModel.DataAnnotations;

namespace Teacher.Entity
{
    public class Class
    {
        public int Id { get; set; }
        [Required]
        [StringLength(80)]
        public string Name { get; set; }
        public string Regime { get; set; }
        public string Course { get; set; }
        public DateTime InitialDate { get; set; }
        public DateTime LastDate { get; set; }
        public int WorkLoad { get; set; }
        public ICollection<Student> Students { get; set; }
        public ICollection<Session> Sessions { get; set; }
        public ICollection<History> Histories { get; set; }
    }
}
