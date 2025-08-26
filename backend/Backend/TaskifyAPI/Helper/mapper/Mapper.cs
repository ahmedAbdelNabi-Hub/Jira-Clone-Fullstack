using AutoMapper;
using Taskify.Contracts.DTOs._Project;
using Taskify.Contracts.DTOs.Task;
using Taskify.Core.Modals;

namespace TaskifyAPI.Helper.mapper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
           CreateMap<Project, ProjectDTO>().ReverseMap();
           CreateMap<TaskItem, TaskItemDTO>()
				    .ForMember(dest => dest.SprintName, opt => opt.MapFrom(src => src.Sprint!.Name))
	                .ForMember(dest => dest.SprintStartDate, opt => opt.MapFrom(src => src.Sprint!.StartDate))
	                .ForMember(dest => dest.SprintEndDate, opt => opt.MapFrom(src => src.Sprint!.EndDate)); ;
        }
    }
}
