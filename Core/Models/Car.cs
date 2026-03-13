using System.ComponentModel.DataAnnotations;

namespace Core.Models;

public class Car:BaseEntity
{
    [MaxLength(255)]
    public string Model { get; set; } = string.Empty;
    [MaxLength(255)]
    public string Mark { get; set; } = string.Empty;

    public List<Order> Orders = new();
}