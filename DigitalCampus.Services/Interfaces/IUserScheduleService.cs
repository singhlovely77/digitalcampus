using DigitalCampus.Domain.DTO;

public interface IUserScheduleService
{
    Task<bool> CreateScheduleAsync(UserScheduleConfigurationRequest request);
}