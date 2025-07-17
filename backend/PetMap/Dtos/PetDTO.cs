using NetTopologySuite.Geometries;

namespace PetMap.Dtos
{
    public class PetResponse
    {
        public int Id { get; set; }

        public required string Contact { get; set; }

        public required string Description { get; set; }
        public Point? Location { get; set; }

        public string? Name { get; set; }

        public int[]? Tags { get; set; } = [];

    }

    public record PetPagedResponse(
        IEnumerable<PetResponse> Pets,
        int? NextId,
        int? PreviousId,
        bool IsFirstPage
    );

    public record PetRequest(
        string Contact,
        string Description,
        Point Location,
        string Name,
        int[]? Tags
    );

    public record GetPetPagedRequest(
        int? Cursor,
        bool? IsNextPage,
        int PageSize
    );
}