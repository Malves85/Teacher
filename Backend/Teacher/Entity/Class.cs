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
        public int StudentId { get; set; }
        public Student Student { get; set; } = null!;
        public int SessionId { get; set; }
        public Session Session { get; set; } = null!;
        public int HistoryId { get; set; }
        public History History { get; set; } = null!;
    }
}
