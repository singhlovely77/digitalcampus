using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DigitalCampus.Domain.DTO
{
    public class UtilityDTO
    {
        public string Type { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string? Description { get; set; }
    }

}
