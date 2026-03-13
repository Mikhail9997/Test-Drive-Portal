namespace Application.Exceptions.Order;

public class OrderStatusTransitionException:Exception
{
    public OrderStatusTransitionException(string error) : base(error){}
}