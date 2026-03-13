using Application.Dtos.Models;
using Application.Dtos.Request;
using Application.Dtos.Response;
using Application.Exceptions.Auth;
using Core.Models;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class AuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IJwtTokenService _tokenService;
    public AuthService(ApplicationDbContext context, IJwtTokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto> Login(LoginRequestDto request)
    {
        User? user = await _context.Users
            .FirstOrDefaultAsync(u => u.Login == request.Login && u.Password == request.Password);

        if (user == null) throw new UserNotFountException("Неверный логин или пароль");

        string token = _tokenService.GenerateJwtToken(user.Login, user.Id, user.Role);
        var response = new AuthResponseDto()
        {
            Token = token,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Login = user.Login
        };

        return response;
    }

    public async Task<AuthResponseDto> Register(RegisterRequestDto request)
    {
        User? userExist = await _context.Users
            .FirstOrDefaultAsync(u => u.Login == request.Login || request.Email == u.Email);

        if (userExist is not null)
        {
            throw new UserAlreadyExistException("Такой пользователь уже существует");
        }
        User user = new User()
        {
            Login = request.Login,
            Password = request.Password,
            Phone = request.Phone,
            FullName = request.FullName,
            Email = request.Email,
            Role = request.Role,
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        
        string token = _tokenService.GenerateJwtToken(user.Login, user.Id, user.Role);
        
        var response = new AuthResponseDto()
        {
            Token = token,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Login = user.Login
        };

        return response;
    }

    public async Task<UserDto> GetMe(int userId)
    {
        User? user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null) throw new UserNotFountException("Ваш профиль не найден");

        return new UserDto()
        {
            FullName = user.FullName,
            Email = user.Email,
            Login = user.Login,
            Phone = user.Phone,
            Role = user.Role
        };
    }
}