using DigitalCampus.Domain.Models;

namespace DigitalCampus.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetDepartmentBasedUsersAsync(Guid departmentId);
        Task<Dictionary<string, List<User>>> GetRoleBasedUsersAsync();
        Task<List<User>> GetRoleBasedUsersAsync(Guid roleId);
        Task<User> GetUserAsync(Guid id);
        Task<List<User>> GetUsersAsync();
        Task<Dictionary<string, List<User>>> GetUsersBasedOnDepartmentAsync();
        Task<List<User>> GetUsersWithProfileAsync();
        Task<User> GetUserWithProfileAsync(Guid id);
    }
}
