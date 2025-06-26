namespace DigitalCampus.Domain.DTO
{
    public class AttendanceFilterRequest
    {
        public Guid UserId { get; set; }
        public int? Year { get; set; }
        public int? Month { get; set; }
    }
}
