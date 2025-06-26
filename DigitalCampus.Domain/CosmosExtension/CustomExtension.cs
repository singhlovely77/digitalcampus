using System.Text.Json.Serialization;

namespace DigitalCampus.Domain.CosmosExtension
{
    public class CustomExtension
    {
        [JsonPropertyName("id")]
        public string Id => EntityId.ToString();

        public Guid EntityId { get; set; }
        public Dictionary<string, object> CustomProperties { get; set; } = new();
    }
}
