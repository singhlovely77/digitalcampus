using DigitalCampus.Domain.DTO;
using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Interface;

public class AttendanceService : IAttendanceService
{
    private readonly IAttendanceRepository _dailyAttendanceRepository;

    public AttendanceService(IAttendanceRepository dailyAttendanceRepository)
    {
        _dailyAttendanceRepository = dailyAttendanceRepository;
    }

    public async Task<IEnumerable<UsersDailyAttendance>> GetAttendanceAsync(AttendanceFilterRequest filterRequest)
    {
        var now = DateTime.Now;

        int year = filterRequest.Year ?? now.Year;
        int month = filterRequest.Month ?? now.Month;

        var startDate = new DateOnly(year, month, 1);
        var endDate = startDate.AddMonths(1);

        return await _dailyAttendanceRepository.GetAttendanceAsync(filterRequest.UserId, startDate, endDate);
    }


    public async Task<IEnumerable<UsersDailySchedule>> GetScheduleAttendanceAsync(AttendanceFilterRequest filterRequest)
    {
        var now = DateTime.Now;

        int year = filterRequest.Year ?? now.Year;
        int month = filterRequest.Month ?? now.Month;

        var startDate = new DateOnly(year, month, 1);
        var endDate = startDate.AddMonths(1);

        return await _dailyAttendanceRepository.GetScheduleAttendanceAsync(filterRequest.UserId, startDate, endDate);
    }

}

