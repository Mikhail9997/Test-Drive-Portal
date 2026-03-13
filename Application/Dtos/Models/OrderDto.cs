using Core.Models;

namespace Application.Dtos.Models;

public class OrderDto
{
    public int Id { get; set; }
    public string Address { get; set; } = string.Empty;
    public string ContactInfo { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string PaymentType { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public CarDto Car { get; set; } = new();
}