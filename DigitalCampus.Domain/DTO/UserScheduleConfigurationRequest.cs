namespace DigitalCampus.Domain.DTO
{
    public class UserScheduleConfigurationRequest
    {
        public Guid UserId { get; set; }
        public string RecurrenceType { get; set; } = null!;
        public int DaysBinary { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public Guid DepartmentShiftId { get; set; }
    }

}
