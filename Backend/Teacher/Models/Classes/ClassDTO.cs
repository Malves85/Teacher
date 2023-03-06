using Teacher.Entity;

namespace Teacher.Models.Classes
{
    public class ClassDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Regime { get; set; }
        public string Course { get; set; }
        public DateTime InitialDate { get; set; }
        public string dateInitialString{ get { return this.InitialDate.ToString("dd/MM/yyyy"); } }
        public DateTime LastDate { get; set; }
        public string dateLastString { get { return this.LastDate.ToString("dd/MM/yyyy"); } }
        public int WorkLoad { get; set; }

        public ClassDTO()  
        {

        }

        public ClassDTO(Class classes)
        {
            Id = classes.Id;
            Name = classes.Name;
            Regime = classes.Regime;
            Course = classes.Course;
            InitialDate = classes.InitialDate;
            LastDate = classes.LastDate;
            WorkLoad = classes.WorkLoad;
        }
    }
}
