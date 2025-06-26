using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Interface;

namespace DigitalCampus.Services.Interfaces
{
    public interface IDepartmentService
    {
        IDepartmentShiftRepository _departmentShiftRepository { get; set; }

        Task<bool> AddShift(DepartmentShift departmentShift);
    }
}