using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models;

public class Order:BaseEntity
{
    [MaxLength(255)]
    public string Address { get; set; } = string.Empty;
    [MaxLength(255)]
    public string ContactInfo { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public PaymentType PaymentType { get; set; } = PaymentType.CreditCard;
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    
    // навигация
    public int UserId { get; set; }
    public User User { get; set; }
    public int CarId { get; set; }
    public Car Car { get; set; }
}

public enum PaymentType
{
    Cash,
    CreditCard
}

public enum OrderStatus
{
    Pending,
    Approved,
    Done,
    Rejected,
}