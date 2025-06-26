namespace DigitalCampus.Domain.Models;

public partial class UsersDailyAttendance
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public DateOnly DateOfWork { get; set; }

    public TimeOnly? TotalHours { get; set; }

    public TimeOnly? Overtime { get; set; }

    public Guid? StatusId { get; set; }

    public virtual Utility? Status { get; set; }
}
