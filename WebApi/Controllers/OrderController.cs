using Application.Dtos.Models;
using Application.Dtos.Request;
using Application.Dtos.Response;
using Application.Exceptions.Car;
using Application.Exceptions.Order;
using Application.Services;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController:ControllerBase
{
    private readonly OrderService _orderService;
    private readonly ICurrentUserService _currentUserService;
    public OrderController(OrderService orderService, ICurrentUserService currentUserService)
    {
        _orderService = orderService;
        _currentUserService = currentUserService;
    }


    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Add(AddOrderRequestDto request)
    {
        try
        {
            if (!_currentUserService.UserId.HasValue)
                return Unauthorized();
            
            int userId = _currentUserService.UserId.Value;
            
            await _orderService.Add(request, userId);
            return Ok(new { message = "Успешно", success = true });
        }
        catch(CarNotFoundException ex)
        {
            return BadRequest(new { message = ex.Message, success = false });
        }
        catch(OrderNotFoundException ex)
        {
            return BadRequest(new { message = ex.Message, success = false });
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }
 
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll([FromQuery]GetOrdersRequestDto request)
    {
        try
        {
            if (!_currentUserService.UserId.HasValue)
                return Unauthorized();

            GetOrdersResponseDto result = await _orderService.GetAll(request);
            return Ok(new {message = "Успешно", data = result, success = true});
            
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }

    [HttpGet("my")]
    [Authorize]
    public async Task<IActionResult> GetMy([FromQuery]GetOrdersRequestDto request)
    {
        try
        {
            if (!_currentUserService.UserId.HasValue)
                return Unauthorized();
            
            int userId = _currentUserService.UserId.Value;

            var result = await _orderService.GetAll(request, userId);
            
            return Ok(new {message = "Успешно", data = result, success = true});
            
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }
    
    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            if (!_currentUserService.UserId.HasValue)
                return Unauthorized();
            
            var order = await _orderService.GetById(id);

            OrderDto result = new()
            {
                Id = order.Id,
                Address = order.Address,
                ContactInfo = order.ContactInfo,
                Date = order.Date,
                PaymentType = order.PaymentType.ToString(),
                Status = order.Status.ToString(),
                Car = new CarDto{Id = order.Car.Id, Mark = order.Car.Model, Model = order.Car.Model}
            };

            return Ok(new { message = "Успешно", data = result ,success = true });
        }
        catch(OrderNotFoundException ex)
        {
            return BadRequest(new { message = ex.Message, success = false });
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }

    [HttpPut("update/{orderId}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UpdateOrder(int orderId, EditOrderRequestDto request)
    {
        try
        {
            if (!_currentUserService.UserId.HasValue)
                return Unauthorized();
            
            await _orderService.Update(request, orderId);
            return Ok(new { message = "Заявка успешно обновлен", success = true });
        }
        catch(OrderNotFoundException ex)
        {
            return BadRequest(new { message = ex.Message, success = false });
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }
    
    [HttpPut("{orderId}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UpdateStatus(int orderId, OrderStatus status)
    {
        try
        {
            if (!_currentUserService.UserId.HasValue)
                return Unauthorized();
            
            await _orderService.UpdateStatus(status, orderId);
            return Ok(new { message = "Статус успешно обновлен", success = true });
        }
        catch(OrderStatusTransitionException ex)
        {
            return BadRequest(new { message = ex.Message, success = false });
        }
        catch(OrderNotFoundException ex)
        {
            return BadRequest(new { message = ex.Message, success = false });
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }
    
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Remove(int id)
    {
        try
        {
            if (!_currentUserService.UserId.HasValue)
                return Unauthorized();

            await _orderService.Remove(id);
            
            return Ok(new { message = "Заявка успешно удалена", success = true });
        }
        catch(OrderNotFoundException ex)
        {
            return BadRequest(new { message = ex.Message, success = false });
        }
        catch(Exception ex)
        {
            return BadRequest(new { message = "Произошла неизвестная ошибка", success = false });
        }
    }
}