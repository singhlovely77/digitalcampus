namespace DigitalCampus.Domain.Models;

public partial class UsersDailySchedule
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid DepartmentShiftId { get; set; }

    public DateOnly ScheduleDate { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public virtual DepartmentShift DepartmentShift { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
