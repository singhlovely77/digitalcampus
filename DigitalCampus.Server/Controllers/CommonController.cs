
using DigitalCampus.Domain.DTO;
using DigitalCampus.Domain.Models;
using DigitalCampus.Repository.Interface;
using DigitalCampus.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DigitalCampus.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CommonController : ControllerBase
    {
        private readonly IRepository<Department> _departmentRepo;
        private readonly IRepository<UserRole> _userRoleRepo;
        private readonly IRepository<DepartmentShift> _shiftRepo;
        private readonly ICommonService _commonService;
        public CommonController(
            IRepository<Department> departmentRepo,
            IRepository<UserRole> userRoleRepo,
            IRepository<DepartmentShift> shiftRepo,
            ICommonService commonService)
        {
            _departmentRepo = departmentRepo;
            _userRoleRepo = userRoleRepo;
            _shiftRepo = shiftRepo;
            _commonService = commonService;
        }



        [HttpGet("departments")]
        public async Task<IActionResult> GetAllDepartments()
        {

            var departments = await _departmentRepo.GetAllAsync();
            return Ok(departments);


        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetAllUserRoles()
        {

            var roles = await _userRoleRepo.GetAllAsync();
            return Ok(roles);


        }

        [HttpGet("shifts")]
        public async Task<IActionResult> GetAllShifts()
        {

            var shifts = await _shiftRepo.GetAllAsync();
            return Ok(shifts);


        }

        //POST
        [HttpPost("departments")]
        public async Task<IActionResult> CreateDepartment([FromBody] DepartmentDTO dto)
        {
            var result = await _commonService.CreateDepartmentAsync(dto);


            if (!result)
                return StatusCode(500, "Failed to create department.");

            return Ok("Department created successfully.");
        }

        [HttpPost("roles")]

        public async Task<IActionResult> CreateUserRole([FromBody] UserRoleDTO dto)
        {
            var result = await _commonService.CreateUserRoleAsync(dto);

            if (!result)
                return StatusCode(500, "Failed to create user role.");

            return Ok("User role created successfully.");
        }

        [HttpPost("shifts")]
        public async Task<IActionResult> CreateDepartmentShift([FromBody] DepartmentShiftDTO dto)
        {
            var result = await _commonService.CreateDepartmentShiftAsync(dto);

            if (!result)
                return StatusCode(500, "Failed to create department shift. Department may not exist.");

            return Ok("Department shift created successfully.");
        }

        [HttpPost("utilities")]
        public async Task<IActionResult> CreateUtility([FromBody] UtilityDTO dto)
        {
            var result = await _commonService.CreateUtilityAsync(dto);

            if (!result)
                return StatusCode(500, "Failed to create utility.");

            return Ok("Utility created successfully.");
        }


    }
}
