namespace DigitalCampus.Domain.Models;

public partial class UserRole
{
    public Guid RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public int Priority { get; set; }

    public string? RoleDefinition { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? ModifiedBy { get; set; }

    public virtual ICollection<UserProfile> UserProfiles { get; set; } = new List<UserProfile>();
}
