using Teacher.Entity;

namespace Teacher.Models.Classes
{
    public class EditClassDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Regime { get; set; }
        public string Course { get; set; }
        public DateTime InitialDate { get; set; }
        public DateTime LastDate { get; set; }
        public int WorkLoad { get; set; }

    }
}
