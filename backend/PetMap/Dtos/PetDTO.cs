using System.Buffers.Text;
using System.Text.Json.Serialization;
using NetTopologySuite.Geometries;
using PetMap.Models;

namespace PetMap.Dtos
{
    public record class  GetPetResponse(
            int id,
            string contact,
            string description,
            string stream_file,
            CoordinateDto? location,
            string? name,
            int[]? tags
    );

    public record PetPagedResponse(
        IEnumerable<GetPetResponse> Pets,
        int? NextId,
        int? PreviousId,
        int? Pages
    )
    {
        public static implicit operator PetPagedResponse((List<PetPost>, int?, int?, int) v)
        {
            throw new NotImplementedException();
        }
    }


    public record struct PostPetRequest(
        string Contact,
        string Description,
        CoordinateDto? Location,
        IFormFile? File,
        string? Name,
        int[]? Tags
    );

    public record class CoordinateDto(double X, double Y)
    {
        [JsonIgnore]
        internal Coordinate ToCoordinate => new(X, Y);
    }
    
    public record GetPetPagedRequest(
        DateTime? Cursor,
        long? RowNumber,
        int PageSize,
        FilterRequest? Options
    );
}