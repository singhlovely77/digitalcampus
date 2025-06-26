using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DigitalCampus.Domain.DTO
{
    public class DepartmentShiftDTO
    {
        public Guid DepartmentId { get; set; }
        public string Name { get; set; } = null!;
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public string? Description { get; set; }

    }
}
