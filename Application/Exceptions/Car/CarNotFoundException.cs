namespace Application.Exceptions.Car;

public class CarNotFoundException:Exception
{
    public CarNotFoundException(string error):base(error){}
}