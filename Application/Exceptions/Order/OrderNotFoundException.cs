namespace Application.Exceptions.Order;

public class OrderNotFoundException:Exception
{
    public OrderNotFoundException(string error) : base(error){}
}