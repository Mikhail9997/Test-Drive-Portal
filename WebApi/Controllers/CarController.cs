using Application.Dtos.Models;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarController:ControllerBase
{
    private readonly ICurrentUserService _currentUserService;
    private readonly CarService _carService;

    public CarController(ICurrentUserService currentUserService, CarService carService)
    {
        _currentUserService = currentUserService;
        _carService = carService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll()
    {
        if (!_currentUserService.UserId.HasValue)
        {
            return Unauthorized();
        }

        try
        {
            List<CarDto> result = await _carService.GetAll();
            return Ok(new { message = "Успешно", data=result, success = true });
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }
}