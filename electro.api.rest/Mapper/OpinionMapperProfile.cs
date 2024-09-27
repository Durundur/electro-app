using AutoMapper;
using electro.api.rest.DTOs.Opinion;
using electro.api.rest.Models.Opinion;

namespace electro.api.rest.Mapper
{
    public class OpinionMapperProfile: Profile
    {
        public OpinionMapperProfile()
        {
            CreateMap<CreateOpinionDto, OpinionModel>();
            CreateMap<OpinionModel, OpinionDto>();
            CreateMap<OpinionDto, OpinionModel>();
        }
    }
}
