using Core.Models;

namespace Application.Dtos.Request;

public class GetOrdersRequestDto
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 5;
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
}