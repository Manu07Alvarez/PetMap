namespace PetMap.Dtos;

    public record class GetFilters(
        string? Name,
        int[]? Tags,
        string? Contact,
        CoordinateDto? Location
    );

    public record class GetOrder(
        bool? Name,
        bool? Date,
        bool? Location,
        bool? Contact
    );
