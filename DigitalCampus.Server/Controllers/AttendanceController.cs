using DigitalCampus.Domain.DTO;
using DigitalCampus.Server.Filters;
using Microsoft.AspNetCore.Mvc;

namespace DigitalCampus.Server.Controllers
{
    [ApiController]
    [ValidateUserAttribute]
    [Route("api/[controller]")]
    public class AttendanceController(IAttendanceService attendanceService,
        IUserScheduleService userScheduleService) : ControllerBase
    {
        private readonly IAttendanceService _attendanceService = attendanceService;
        private readonly IUserScheduleService _userScheduleService = userScheduleService;

        [HttpPost]

        public async Task<IActionResult> GetAttendances(AttendanceFilterRequest filterRequest)
        {
            var result = await _attendanceService.GetAttendanceAsync(filterRequest);
            return Ok(result);
        }

        [HttpPost("schedule/create")]
        public async Task<IActionResult> CreateSchedule([FromBody] UserScheduleConfigurationRequest request)
        {
            var result = await _userScheduleService.CreateScheduleAsync(request);
            return result
                ? Ok()
                : StatusCode(500, "Failed to save schedule");
        }

        [HttpPost("schedule")]
        public async Task<IActionResult> GetScheduleAttendance(AttendanceFilterRequest filterRequest)
        {
            var result = await _attendanceService.GetScheduleAttendanceAsync(filterRequest);
            return Ok(result);
        }
    }
}
