using DigitalCampus.Domain.DTO;
using DigitalCampus.Domain.Models;

public interface IAttendanceService
{
    Task<IEnumerable<UsersDailySchedule>> GetScheduleAttendanceAsync(AttendanceFilterRequest filterRequest);
    Task<IEnumerable<UsersDailyAttendance>> GetAttendanceAsync(AttendanceFilterRequest filterRequest);
}




