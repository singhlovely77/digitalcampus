namespace DigitalCampus.Domain.Configuration
{
    public class AzureAD
    {
        public const string sectionName = "AzureAd";
        public string Instance { get; set; } = string.Empty;
        public string Domain { get; set; } = string.Empty;
        public string ClientId { get; set; } = string.Empty;
        public string ClientSecret { get; set; } = string.Empty;
        public string TenantId { get; set; } = string.Empty;
        public string[] AllowedClientApps { get; set; } = [];
    }

    //public class AzureActiveDirectory
    //{
    //    public const string sectionName = "AzureB2C";
    //    public string Instance { get; set; } = string.Empty;
    //    public string Domain { get; set; } = string.Empty;
    //    public string ClientId { get; set; } = string.Empty;
    //    public string ClientSecret { get; set; } = string.Empty;
    //    public string TenantId { get; set; } = string.Empty;
    //    public string[] AllowedClientApps { get; set; } = [];
    //}

    public class Provider
    {
        public const string sectionName = "Provider";
        public string Type { get; set; } = string.Empty;
    }
}
