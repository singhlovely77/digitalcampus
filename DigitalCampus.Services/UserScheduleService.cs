using DigitalCampus.Domain.DTO;
using DigitalCampus.Domain.Enums;
using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Context;
using DigitalCampus.Repository.Interface;
using Microsoft.EntityFrameworkCore;

public class UserScheduleService : IUserScheduleService
{
    private readonly DigitalDbContext _dbContext;

    private readonly IRepository<UsersScheduleConfiguration> _repository;

    public UserScheduleService(IRepository<UsersScheduleConfiguration> repository, DigitalDbContext dbContext)
    {
        _repository = repository;
        _dbContext = dbContext;
    }

    public async Task<bool> CreateScheduleAsync(UserScheduleConfigurationRequest request)
    {
        var shiftExists = await _dbContext.DepartmentShifts
                    .AnyAsync(d => d.Id == request.DepartmentShiftId);

        if (!shiftExists)
        {
            return false;
        }

        if (!Enum.TryParse<RecurrenceType>(request.RecurrenceType, true, out var recurrenceType))
            return false;

        var entity = new UsersScheduleConfiguration
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            RecurrenceType = recurrenceType.ToString(),
            DaysBinary = request.DaysBinary.ToString(),
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            DepartmentShiftId = request.DepartmentShiftId,
            CreatedDate = DateTime.UtcNow
        };

        await _repository.SaveChangesAsync(entity);
        return true;
    }
}
