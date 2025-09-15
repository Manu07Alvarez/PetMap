using PetMap.Models;

namespace PetMap.Dtos;

    public record class FilterRequest(
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

    public record class FilterResponse(
        PetPost Posts,
        long Rows
    );