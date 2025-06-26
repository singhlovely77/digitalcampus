using DigitalCampus.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DigitalCampus.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;
        public UserController(IUserService userService,
            ILogger<UserController> logger)
        {
            _userService= userService;
            _logger = logger;

        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetAllUsersWithProfile()
        {
            var users = await _userService.GetUsersWithProfileAsync();
            return Ok(users);

        }

        [HttpGet()]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(users);

        }

        [HttpGet("profile/{id}")]
        public async Task<IActionResult> GetUserWithProfile(Guid id)
        {
            var user = await _userService.GetUserWithProfileAsync(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllUsers(Guid id)
        {
            var users = await _userService.GetUserAsync(id);
            return Ok(users);

        }

        [HttpGet("role/{id}")]
        public async Task<IActionResult> GetUserWithRole(Guid id)
        {
            var users = await _userService.GetRoleBasedUsersAsync(id);

            if (users == null)
                return NotFound();

            return Ok(users);
        }

        //[HttpGet("role")]
        //public async Task<IActionResult> GetUsersWithRole(Guid id)
        //{
        //    var users = await _userService.GetUserAsync(id);
        //    return Ok(users);

        //}

        //[HttpGet("profile/{id}")]
        //public async Task<IActionResult> GetUserWithProfile(Guid id)
        //{
        //    var user = await _userService.GetUserWithProfileAsync(id);

        //    if (user == null)
        //        return NotFound();

        //    return Ok(user);
        //}

        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetAllUsers(Guid id)
        //{
        //    var users = await _userService.GetUserAsync(id);
        //    return Ok(users);

        //}


    }
}
