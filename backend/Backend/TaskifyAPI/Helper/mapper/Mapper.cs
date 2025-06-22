using AutoMapper;
using Taskify.Contracts.DTOs._Project;
using Taskify.Core.Modals;

namespace TaskifyAPI.Helper.mapper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
           CreateMap<Project, ProjectDTO>().ReverseMap();
        }
    }
}
