using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Interface;
using DigitalCampus.Services.Interfaces;

namespace DigitalCampus.Services.Modules.UserManagement
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository=userRepository;
        }


        public async Task<List<User>> GetUsersAsync()
        {
            return await _userRepository.GetUsersAsync();
        }

        public async Task<User> GetUserAsync(Guid id)
        {
            return await _userRepository.GetUserAsync(id);
        }

        public async Task<User> GetUserWithProfileAsync(Guid id)
        {
            return await _userRepository.GetUserWithProfileAsync(id);

        }

        public async Task<List<User>> GetUsersWithProfileAsync()
        {
            return await _userRepository.GetUsersWithProfileAsync();

        }

        public async Task<Dictionary<string, List<User>>> GetRoleBasedUsersAsync()
        {
            var users = await _userRepository.GetUsersWithProfileAsync();

            var usersByRole = users
                .Where(u => u.UserProfile?.Role != null)
                .GroupBy(u => u.UserProfile.Role.RoleName)
                .ToDictionary(g => g.Key, g => g.ToList());

            return usersByRole;
        }

        public async Task<List<User>> GetRoleBasedUsersAsync(Guid roleId)
        {
            return await _userRepository.GetUsersWithRoleAsync(roleId);

        }

        public async Task<Dictionary<string, List<User>>> GetUsersBasedOnDepartmentAsync()
        {
            var users = await _userRepository.GetUsersWithProfileAsync();

            var usersByDepartment = users
                .Where(u => u.UserProfile?.Role != null)
                .GroupBy(u => u.UserProfile.Dept.Name)
                .ToDictionary(g => g.Key, g => g.ToList());

            return usersByDepartment;

        }

        public async Task<List<User>> GetDepartmentBasedUsersAsync(Guid departmentId)
        {
            return await _userRepository.GetUsersWithRoleAsync(departmentId);

        }

    }
}
