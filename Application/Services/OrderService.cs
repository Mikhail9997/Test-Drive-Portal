using Application.Dtos.Models;
using Application.Dtos.Request;
using Application.Dtos.Response;
using Application.Exceptions.Car;
using Application.Exceptions.Order;
using Core.Models;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class OrderService
{
    private readonly ApplicationDbContext _context;

    public OrderService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<GetOrdersResponseDto> GetAll(GetOrdersRequestDto request, int userId = 0)
    {
        IQueryable<Order> orders = _context.Orders
            .Include(o => o.Car);
        
        if (userId != 0)
        {
            orders = orders.Where(o => o.UserId == userId);
        }

        var totalCount = await orders.CountAsync();
        
        orders = orders
            .OrderBy(o => o.Id)
            .Skip((request.Page - 1 ) * request.PageSize)
            .Take(request.PageSize);
        
        return new GetOrdersResponseDto()
        {
            Orders = await orders.Select(o => new OrderDto()
            {
                Id = o.Id,
                Address = o.Address,
                ContactInfo = o.ContactInfo,
                Date = o.Date,
                PaymentType = o.PaymentType.ToString(),
                Status = o.Status.ToString(),
                Car = new CarDto{Id = o.Car.Id, Mark = o.Car.Mark, Model = o.Car.Model}
            }).ToListAsync(),
            Page = request.Page,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }
    
    public async Task Add(AddOrderRequestDto request, int userId)
    {
        // Проверяем существование автомобиля
        var carExists = await _context.Cars.AnyAsync(c => c.Id == request.CarId);
        if (!carExists)
        {
            throw new CarNotFoundException($"Автомобиль с ID {request.CarId} не существует");
        }
        
        Order order = new Order()
        {
            Address = request.Address,
            ContactInfo = request.ContactInfo,
            Date = request.Date,
            PaymentType = request.PaymentType,
            UserId = userId,
            CarId = request.CarId
        };

        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
    }

    public async Task Update(EditOrderRequestDto request, int orderId)
    {
        Order? order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
        if (order is null)
        {
            throw new OrderNotFoundException("Заявка не найдена");
        }

        order.Address = request.Address;
        order.ContactInfo = request.ContactInfo;
        order.Date = request.Date;
        order.PaymentType = request.PaymentType;
        order.CarId = request.CarId;
        
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
    }
    
    public async Task<Order> GetById(int orderId)
    {
        Order? order = await _context.Orders
            .Include(o => o.Car)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null) throw new OrderNotFoundException("Заявка не найдена");

        return order;
    }
    
    public async Task Remove(int orderId)
    {
        Order? order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null) throw new OrderNotFoundException("Заявка не найдена");
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateStatus(OrderStatus newStatus, int orderId)
    {
        Order? order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
        
        if (order == null) throw new OrderNotFoundException("Заявка не найдена");

        if (!OrderStatusTransitions(order.Status, newStatus))
        {
            throw new OrderStatusTransitionException($"Невозможно изменить статус {order.Status} на {newStatus}");
        }

        order.Status = newStatus;
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
    }

    private bool OrderStatusTransitions(OrderStatus currentStatus, OrderStatus newStatus)
    {
        // Если статус не изменился - всегда можно
        if (currentStatus == newStatus) return true;
    
        return currentStatus switch
        {
            OrderStatus.Pending => newStatus == OrderStatus.Approved || 
                                   newStatus == OrderStatus.Rejected || 
                                   newStatus == OrderStatus.Done,
                                
            OrderStatus.Approved => newStatus == OrderStatus.Done || 
                                    newStatus == OrderStatus.Rejected,
                                 
            OrderStatus.Done => false, // из Done нельзя
        
            OrderStatus.Rejected => false, // из Rejected нельзя
        
            _ => false
        };
    }
}