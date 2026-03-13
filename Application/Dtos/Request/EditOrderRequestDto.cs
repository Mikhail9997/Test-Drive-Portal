using Core.Models;

namespace Application.Dtos.Request;

public class EditOrderRequestDto
{
    public string Address { get; set; } = string.Empty;
    public string ContactInfo { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public PaymentType PaymentType { get; set; } = PaymentType.CreditCard;
    public int CarId { get; set; }
}