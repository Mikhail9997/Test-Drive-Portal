using System.ComponentModel.DataAnnotations;

namespace Core.Models;

public class User:BaseEntity
{
    [MaxLength(255)]
    public string Login { get; set; } = string.Empty;
    [Range(6,65)]
    public string Password { get; set; } = string.Empty;
    [Phone]
    public string Phone { get; set; } = string.Empty;
    [MaxLength(255)]
    public string FullName { get; set; } = string.Empty;
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.User;

    // навигация
    public List<Order> Orders { get; set; } = new();
}

public enum UserRole
{
    User,
    Administrator
}