using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Presentation.Features.Task.Commands
{
    public record DeleteTaskCommand(int taskId) : IRequest<BaseApiResponse>;
    
}
