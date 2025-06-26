namespace DigitalCampus.Domain.Models;

public partial class User
{
    public Guid UserId { get; set; }

    public Guid ExternalId { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public virtual UserProfile UserProfile { get; set; }

    public virtual ICollection<UsersCardSwipe> UsersCardSwipes { get; set; } = new List<UsersCardSwipe>();

    public virtual ICollection<UsersDailySchedule> UsersDailySchedules { get; set; } = new List<UsersDailySchedule>();

    public virtual ICollection<UsersScheduleConfiguration> UsersScheduleConfigurations { get; set; } = new List<UsersScheduleConfiguration>();
}
