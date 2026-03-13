namespace Application.Exceptions.Auth;

public class UserNotFountException:Exception
{
    public UserNotFountException(string error):base(error){}
}