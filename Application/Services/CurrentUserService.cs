using System.Security.Claims;
using Core.Models;
using Microsoft.AspNetCore.Http;

namespace Application.Services;

public interface ICurrentUserService
{
    int? UserId { get; }
    string? Login { get; }
    string? Role { get; }
    bool IsAuthenticated { get; }
}

public class CurrentUserService:ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int? UserId
    {
        get
        {
            string? useIdStr = _httpContextAccessor.HttpContext?.User?
                .FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return int.TryParse(useIdStr, out var userId) ? userId : null;
        }
    }

    public string? Login => _httpContextAccessor.HttpContext?.User?
        .FindFirst(ClaimTypes.Name)?.Value;
    
    public string? Role => _httpContextAccessor.HttpContext?.User?
        .FindFirst(ClaimTypes.Role)?.Value;

    public bool IsAuthenticated => UserId.HasValue;
}