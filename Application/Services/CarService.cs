using Application.Dtos.Models;
using Core.Models;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class CarService
{
    private readonly ApplicationDbContext _dbContext;

    public CarService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<CarDto>> GetAll()
    {
        List<Car> cars = await _dbContext.Cars
            .OrderBy(c => c.Model)
            .ToListAsync();
        List<CarDto> result = cars.Select(c => new CarDto()
        {
            Id = c.Id,
            Model = c.Model,
            Mark = c.Mark
        }).ToList();

        return result;
    }
}