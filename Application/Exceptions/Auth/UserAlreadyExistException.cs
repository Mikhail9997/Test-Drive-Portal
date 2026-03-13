namespace Application.Exceptions.Auth;

public class UserAlreadyExistException:Exception
{
    public UserAlreadyExistException(string error):base(error){}
}