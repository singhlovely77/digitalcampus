namespace DigitalCampus.Domain.Models;

public partial class UsersCardSwipe
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public DateTime? InTime { get; set; }

    public DateTime? OutTime { get; set; }

    public string? DigitalId { get; set; }

    public virtual User User { get; set; } = null!;
}
