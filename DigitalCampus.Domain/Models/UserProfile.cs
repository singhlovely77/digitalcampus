namespace DigitalCampus.Domain.Models;

public partial class UserProfile
{
    public Guid UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string? MiddleName { get; set; }

    public string LastName { get; set; } = null!;

    public DateOnly DateOfBirth { get; set; }

    public string Gender { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public string? ProfilePictureUrl { get; set; }

    public string LanguagePreference { get; set; } = null!;

    public string TimeZone { get; set; } = null!;

    public string Theme { get; set; } = null!;

    public bool NotificationPreference { get; set; }

    public Guid RoleId { get; set; }

    public Guid DeptId { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public virtual Department Dept { get; set; } = null!;

    public virtual UserRole Role { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
