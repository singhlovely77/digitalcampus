using System.Text.Json;

namespace DigitalCampus.Domain.Models
{
    public class AuditEntry
    {
        //public AuditEntry(EntityEntry entry)
        //{
        //    Entry = entry;
        //}

        //public EntityEntry Entry { get; }

        //public string TableName { get; set; }
        //public string Action { get; set; }
        //public string ChangedBy { get; set; }

        //public Dictionary<string, object> OldValues { get; } = new();
        //public Dictionary<string, object> NewValues { get; } = new();
        //public List<string> ChangedColumns { get; } = new();
        //public List<PropertyEntry> TemporaryProperties { get; } = new();

        //public bool HasTemporaryProperties => TemporaryProperties.Any();

        //public AuditLog ToAuditLog()
        //{
        //    return new AuditLog
        //    {
        //        EntityName = TableName,
        //        EntityId = Entry.Properties.FirstOrDefault(p => p.Metadata.IsPrimaryKey())?.CurrentValue?.ToString(),
        //        ChangeType = Action,
        //        ChangedBy = ChangedBy,
        //        ChangedAt = DateTime.UtcNow,
        //        OldValues = JsonSerializer.Serialize(OldValues),
        //        NewValues = JsonSerializer.Serialize(NewValues),
        //        ChangedFields = JsonSerializer.Serialize(ChangedColumns)
        //    };
        //}
    }
}

