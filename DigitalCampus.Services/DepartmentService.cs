using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Interface;
using DigitalCampus.Services.Interfaces;

namespace DigitalCampus.Services
{
    public class DepartmentService : IDepartmentService
    {
        public IDepartmentShiftRepository _departmentShiftRepository { get; set; }
        public DepartmentService(IDepartmentShiftRepository departmentShiftRepository)
        {
            _departmentShiftRepository = departmentShiftRepository;
        }

        public async Task<bool> AddShift(DepartmentShift departmentShift)
        {
            await _departmentShiftRepository.SaveChangesAsync(departmentShift);
            return true;
        }

    }

}
