using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DigitalCampus.Domain.DTO
{
        public class UserRoleDTO
    {
        public string RoleName { get; set; } = null!;
        public int Priority { get; set; }
        public string? RoleDefinition { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
