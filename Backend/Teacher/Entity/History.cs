using System.ComponentModel.DataAnnotations;

namespace Teacher.Entity
{
    public class History
    {
        public int Id { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
    }
}
