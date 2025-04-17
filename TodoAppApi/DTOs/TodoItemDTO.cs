namespace TodoAppApi.DTOs
{
    public record TodoItemDto(int? Id, string Title, bool IsCompleted,int? ProjectId)
    {
    }
}
