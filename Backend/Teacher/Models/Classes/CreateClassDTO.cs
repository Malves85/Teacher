using FluentValidation;
using Teacher.Entity;

namespace Teacher.Models.Classes
{
    public class CreateClassDTO
    {
        public string Name { get; set; }
        public string Regime { get; set; }
        public string Course { get; set; }
        public DateTime InitialDate { get; set; }
        public string dateInitialString { get { return this.InitialDate.ToString("dd/MM/yyyy"); } }
        public DateTime LastDate { get; set; }
        public string dateLastString { get { return this.LastDate.ToString("dd/MM/yyyy"); } }
        public int WorkLoad { get; set; }

        public Class ToEntity()
        {
            var newClass = new Class();
            newClass.Name = Name;
            newClass.Regime = Regime;
            newClass.Course = Course;
            newClass.InitialDate = InitialDate;
            newClass.LastDate = LastDate;
            newClass.WorkLoad = WorkLoad;

            return newClass;
        }
        public class CreateClassDTOValidator : AbstractValidator<CreateClassDTO>
        {
            public CreateClassDTOValidator()
            {
                RuleFor(x => x.Name).NotEmpty().WithMessage("O nome da turma é necessário.");
                RuleFor(x => x.Regime).NotEmpty().WithMessage("O regime é necessário.");
                RuleFor(x => x.Course).NotEmpty().WithMessage("O curso é necessário.");
                RuleFor(x => x.InitialDate).NotEmpty().WithMessage("A data inicial é necessário.");
                RuleFor(x => x.LastDate).NotEmpty().WithMessage("A data final é necessário.");
                RuleFor(x => x.WorkLoad).NotEmpty().WithMessage("A carga horária é necessário.");
            }
        }
    }
}
