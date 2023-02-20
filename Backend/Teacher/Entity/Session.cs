using System.ComponentModel.DataAnnotations;

namespace Teacher.Entity
{
    public class Session
    {
        public int Id { get; set; }
        [Required]
        public int Number { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
    }
}
