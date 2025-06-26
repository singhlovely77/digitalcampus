using DigitalCampus.Domain.Models;

namespace DigitalCampus.Repository.Interface
{
    public interface IAttendanceRepository
    {
        Task<IEnumerable<UsersDailyAttendance>> GetAttendanceAsync(Guid userId, DateOnly startDate, DateOnly endDate);
        Task<IEnumerable<UsersDailySchedule>> GetScheduleAttendanceAsync(Guid userId, DateOnly startDate, DateOnly endDate);

    }
}
