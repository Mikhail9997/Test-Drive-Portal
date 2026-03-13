using Application.Dtos.Models;
using Core.Models;

namespace Application.Dtos.Response;

public class GetOrdersResponseDto
{
    public List<OrderDto> Orders { get; set; } = new();
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public int TotalCount { get; set; }
}