using DigitalCampus.Domain.Models;

namespace DigitalCampus.Repository.Interface
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetUserAsync(Guid id);
        Task<List<User>> GetUsersAsync();
        Task<List<User>> GetUsersWithProfileAsync();
        Task<User> GetUserWithProfileAsync(Guid id);
        Task<List<User>> GetUsersWithRoleAsync(Guid roleId);
        Task<List<User>> GetUsersWithDepartmentAsync(Guid departmentId);
    }
}
