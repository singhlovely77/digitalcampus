using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Context;
using DigitalCampus.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DigitalCampus.Repository
{
    public class AttendanceRepository(DigitalDbContext dbContext) : Repository<UsersDailyAttendance>(dbContext), IAttendanceRepository
    {
        private readonly DigitalDbContext _dbContext = dbContext;

        public async Task<IEnumerable<UsersDailyAttendance>> GetAttendanceAsync(Guid userId, DateOnly startDate, DateOnly endDate)
        {
            var attendance = await _dbContext.UsersDailyAttendances
                           .Where(a => a.UserId == userId &&
                                       a.DateOfWork >= startDate &&
                                       a.DateOfWork < endDate).OrderBy(a => a.DateOfWork)
                           .ToListAsync();
            return attendance;

        }
        public async Task<IEnumerable<UsersDailySchedule>> GetScheduleAttendanceAsync(Guid userId, DateOnly startDate, DateOnly endDate)
        {
            var dailySchedule = await _dbContext.UsersDailySchedules
                           .Where(a => a.UserId == userId &&
                                       a.ScheduleDate >= startDate &&
                                       a.ScheduleDate < endDate).OrderBy(a => a.ScheduleDate)
                           .ToListAsync();
            return dailySchedule;

        }


    }
}
