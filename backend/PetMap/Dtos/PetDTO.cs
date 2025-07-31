using System.Text.Json.Serialization;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;

namespace PetMap.Dtos
{
    public class PetResponse
    {
        public int Id { get; set; }

        public required string Contact { get; set; }

        public required string Description { get; set; }
        public CoordinateDto? Location { get; set; }

        public string? Name { get; set; }

        public int[]? Tags { get; set; } = [];

    }

    public record PetPagedResponse(
        IEnumerable<PetResponse> Pets,
        int? NextId,
        int? PreviousId,
        int? Pages
    );

    public record PetRequest(
        string Contact,
        string Description,
        CoordinateDto? Location,
        string Name,
        int[]? Tags
    );

    public record class CoordinateDto (double X, double Y)
    {
        [JsonIgnore]
        public Coordinate ToCoordinate => new(X, Y);
    }
    

    public record GetPetPagedRequest(
        int? Cursor,
        int PageSize,
        Dictionary<string, string> Options
    );
}