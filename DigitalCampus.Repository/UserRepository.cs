using DigitalCampus.Repository.Context;
using DigitalCampus.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using User = DigitalCampus.Domain.Models.User;

namespace DigitalCampus.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly DigitalDbContext _dbContext;
        //private readonly Container _cosmosContainer;

        public UserRepository(DigitalDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
            //_cosmosContainer = cosmosClient.GetContainer("YourDatabaseId", "CustomerExtensions");
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _dbContext.Users.AsNoTracking().ToListAsync();
        }

        public async Task<User> GetUserAsync(Guid id)
        {
            return await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(x => x.UserId==id);
        }

        public async Task<User> GetUserWithProfileAsync(Guid id)
        {
            var user = await _dbContext.Users.AsNoTracking()
                        .Include(u => u.UserProfile)
                            .ThenInclude(up => up.Role)
                        .Include(u => u.UserProfile)
                            .ThenInclude(up => up.Dept)
                        .FirstOrDefaultAsync(up => up.UserId == id);
            return user;

        }

        public async Task<List<User>> GetUsersWithProfileAsync()
        {
            var users = await _dbContext.Users.AsNoTracking()
                        .Include(u => u.UserProfile)
                            .ThenInclude(up => up.Role)
                        .Include(u => u.UserProfile)
                            .ThenInclude(up => up.Dept)
                         .Take(20).ToListAsync();

            return users;
        }

        public async Task<List<User>> GetUsersWithRoleAsync(Guid roleId)
        {
            var users = await _dbContext.Users
                        .Include(u => u.UserProfile)
                            .ThenInclude(up => up.Role) // Include Role through UserProfile
                        .Include(u => u.UserProfile)
                            .ThenInclude(up => up.Dept)
                        .Where(u => u.UserProfile != null && u.UserProfile.RoleId == roleId)
                         .Take(20).ToListAsync();

            return users;
        }

        public async Task<List<User>> GetUsersWithDepartmentAsync(Guid departmentId)
        {
            var users = await _dbContext.Users
                        .Include(u => u.UserProfile)
                            .ThenInclude(up => up.Role)// Include Role through UserProfile
                        .Include(u => u.UserProfile)
                            .ThenInclude(up => up.Dept)
                        .Where(u => u.UserProfile != null && u.UserProfile.DeptId == departmentId)
                         .Take(20).ToListAsync();

            return users;
        }



    }
}
