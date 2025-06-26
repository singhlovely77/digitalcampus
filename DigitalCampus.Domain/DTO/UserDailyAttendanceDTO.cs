using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DigitalCampus.Domain.DTO
{
    public class UsersDailyAttendanceDTO
    {
        public Guid UserId { get; set; }
        public DateOnly DateOfWork { get; set; }
        public TimeOnly? TotalHours { get; set; }
        public TimeOnly? Overtime { get; set; }
        public Guid? StatusId { get; set; }
    }
}
