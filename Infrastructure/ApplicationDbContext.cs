using Core.Models;
using Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class ApplicationDbContext:DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Car> Cars { get; set; }
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new OrderConfiguration());
        
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        List<Car> cars = new List<Car>()
        {
            new Car()
            {
                Id = 1,
                Mark = "Lada",
                Model = "Granta Sedan"
            },
            new Car()
            {
                Id = 2,
                Mark = "Lada",
                Model = "Vesta Sedan"
            },
            new Car()
            {
                Id = 3,
                Mark = "BMW",
                Model = "X3"
            },
            new Car()
            {
                Id = 4,
                Mark = "BMW",
                Model = "X6"
            },
        };
        modelBuilder.Entity<Car>().HasData(cars);
    }
}