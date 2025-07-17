using AutoMapper;
using PetMap.Models;
using PetMap.Dtos;

namespace PetMap.Mappings;
public class PetProfile : Profile
{
    public PetProfile()
    {
        CreateMap<PetPost, PetResponse>();
        CreateMap<PetRequest, PetPost>();
        // y otros mappings que necesites
    }
}
