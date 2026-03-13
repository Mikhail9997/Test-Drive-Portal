using Application.Dtos.Models;
using Application.Dtos.Request;
using Application.Dtos.Response;
using Application.Exceptions.Auth;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController:ControllerBase
{
    private readonly AuthService _authService;
    private readonly ICurrentUserService _currentUserService;
    
    public AuthController(AuthService authService, ICurrentUserService currentUserService)
    {
        _authService = authService;
        _currentUserService = currentUserService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto request)
    {
        try
        {
            AuthResponseDto result = await _authService.Login(request);
            return Ok(new { message = "Успешно", data = result, success = true });
        }
        catch (UserNotFountException ex)
        {
            return BadRequest(new { message = ex.Message, success = false });
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }
    
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterRequestDto request)
    {
        try
        {
            AuthResponseDto result = await _authService.Register(request);
            return Ok(new { message = "Успешно", data = result, success = true });
        }
        catch (UserAlreadyExistException ex)
        {
            return BadRequest(new { message = ex.Message, success = false });
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }

    [HttpGet("Me")]
    [Authorize]
    public async Task<IActionResult> GetMe()
    {
        try
        {
            if (!_currentUserService.UserId.HasValue)
            {
                return Unauthorized();
            }

            int userId = _currentUserService.UserId.Value;
            UserDto userDto = await _authService.GetMe(userId);
            
            return Ok(new { message = "успешно", data = userDto, success = true });
        }
        catch (UserNotFountException ex)
        {
            return BadRequest();
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }
}