using DigitalCampus.Domain.DTO;
using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Context;
using DigitalCampus.Repository.Interface;
using DigitalCampus.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DigitalCampus.Services
{
    public class CommonService : ICommonService
    {

        private readonly IRepository<Department> _departmentRepository;
        private readonly IRepository<DepartmentShift> _departmentShiftRepository;
        private readonly IRepository<Utility> _utilityRepository;
        private readonly IRepository<UserRole> _userRoleRepository;

        private readonly DigitalDbContext _dbContext;

        public CommonService(
            IRepository<Department> departmentRepository,
            IRepository<DepartmentShift> departmentShiftRepository,
            IRepository<Utility> utilityRepository,
            IRepository<UserRole> userRoleRepository,
            DigitalDbContext dbContext)
        {
            _departmentRepository = departmentRepository;
            _departmentShiftRepository = departmentShiftRepository;
            _utilityRepository = utilityRepository;
            _userRoleRepository = userRoleRepository;
            _dbContext = dbContext;
        }

        // Department
        public async Task<IEnumerable<Department>> GetDepartmentsAsync()
        {
            return await _departmentRepository.GetAllAsync();
        }

        public async Task<bool> CreateDepartmentAsync(Department department)
        {
            await _departmentRepository.AddAsync(department);
            await _departmentRepository.SaveAsync();
            return true;
        }

        // DepartmentShift
        public async Task<IEnumerable<DepartmentShift>> GetDepartmentShiftsAsync()
        {
            return await _departmentShiftRepository.GetAllAsync();
        }

        public async Task<bool> CreateDepartmentShiftAsync(DepartmentShift shift)
        {
            await _departmentShiftRepository.AddAsync(shift);
            await _departmentShiftRepository.SaveAsync();
            return true;
        }

        // Utility
        public async Task<IEnumerable<Utility>> GetUtilitiesAsync()
        {
            return await _utilityRepository.GetAllAsync();
        }

        public async Task<bool> CreateUtilityAsync(Utility utility)
        {

            await _utilityRepository.SaveChangesAsync(utility);
            return true;
        }

        // UserRole
        public async Task<IEnumerable<UserRole>> GetUserRolesAsync()
        {
            return await _userRoleRepository.GetAllAsync();
        }

        public async Task<bool> CreateUserRoleAsync(UserRole role)
        {

            await _userRoleRepository.SaveChangesAsync(role);
            return true;
        }

        //Create_DepartmentShift
        public async Task<bool> CreateDepartmentShiftAsync(DepartmentShiftDTO dto)
        {
            var shift = new DepartmentShift
            {
                Id = Guid.NewGuid(),
                DepartmentId = dto.DepartmentId,
                Name = dto.Name,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Description = dto.Description,
                CreatedDate = DateTime.UtcNow
            };

            var deptExists = await _dbContext.Departments.AnyAsync(d => d.Id == dto.DepartmentId);
            if (!deptExists)
                return false;


            await _departmentShiftRepository.SaveChangesAsync(shift);
            return true;
        }

        //Create Department
        public async Task<bool> CreateDepartmentAsync(DepartmentDTO dto)
        {
            var department = new Department
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description
            };


            await _departmentRepository.SaveChangesAsync(department);

            return true;
        }

        public async Task<bool> CreateUserRoleAsync(UserRoleDTO dto)
        {
            var role = new UserRole
            {
                RoleId = Guid.NewGuid(),
                RoleName = dto.RoleName,
                Priority = dto.Priority,
                RoleDefinition = dto.RoleDefinition,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = dto.ModifiedDate,
                ModifiedBy = dto.ModifiedBy
            };


            await _userRoleRepository.SaveChangesAsync(role);

            return true;
        }

        public async Task<bool> CreateUtilityAsync(UtilityDTO dto)
        {
            var utility = new Utility
            {
                Id = Guid.NewGuid(),
                Type = dto.Type,
                Code = dto.Code,
                Description = dto.Description
            };


            await _utilityRepository.SaveChangesAsync(utility);

            return true;
        }


    }

}
