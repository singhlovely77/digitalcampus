namespace DigitalCampus.Domain.Models;

public partial class DepartmentShift
{
    public Guid Id { get; set; }

    public Guid DepartmentId { get; set; }

    public string Name { get; set; } = null!;

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public string? Description { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public virtual Department Department { get; set; } = null!;

    public virtual ICollection<UsersDailySchedule> UsersDailySchedules { get; set; } = new List<UsersDailySchedule>();

    public virtual ICollection<UsersScheduleConfiguration> UsersScheduleConfigurations { get; set; } = new List<UsersScheduleConfiguration>();
}
