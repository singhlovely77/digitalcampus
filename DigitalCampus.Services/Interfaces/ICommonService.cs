using DigitalCampus.Domain.DTO;
using DigitalCampus.Domain.Models;

namespace DigitalCampus.Services.Interfaces
{
    public interface ICommonService
    {
        Task<bool> CreateDepartmentAsync(Department department);
        Task<bool> CreateDepartmentAsync(DepartmentDTO dto);
        Task<bool> CreateDepartmentShiftAsync(DepartmentShift shift);
        Task<bool> CreateDepartmentShiftAsync(DepartmentShiftDTO dto);
        Task<bool> CreateUserRoleAsync(UserRole role);
        Task<bool> CreateUserRoleAsync(UserRoleDTO dto);
        Task<bool> CreateUtilityAsync(Utility utility);
        Task<bool> CreateUtilityAsync(UtilityDTO dto);
        Task<IEnumerable<Department>> GetDepartmentsAsync();
        Task<IEnumerable<DepartmentShift>> GetDepartmentShiftsAsync();
        Task<IEnumerable<UserRole>> GetUserRolesAsync();
        Task<IEnumerable<Utility>> GetUtilitiesAsync();
    }
}