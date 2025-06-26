namespace DigitalCampus.Domain.Models;

public partial class Utility
{
    public Guid Id { get; set; }

    public string Type { get; set; } = null!;

    public string Code { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<UsersDailyAttendance> UsersDailyAttendances { get; set; } = new List<UsersDailyAttendance>();
}
