namespace DigitalCampus.Domain.Models
{
    public class AuditLog
    {
        public int Id { get; set; }

        public string EntityName { get; set; }            // e.g., "User", "UserPreferences"
        public string EntityId { get; set; }              // The primary key of the entity
        public string ChangeType { get; set; }            // e.g., "Created", "Updated", "Deleted"

        public string ChangedBy { get; set; }
        public DateTime ChangedAt { get; set; }

        public string OldValues { get; set; }             // Serialized JSON
        public string NewValues { get; set; }             // Serialized JSON

        public string ChangedFields { get; set; }         // Serialized JSON list of property names
    }

}
