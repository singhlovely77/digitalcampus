namespace DigitalCampus.Domain.Models;

public partial class UsersScheduleConfiguration
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string RecurrenceType { get; set; } = null!;

    public string DaysBinary { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public Guid DepartmentShiftId { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public virtual DepartmentShift DepartmentShift { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
