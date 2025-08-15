
using PetMap.Dtos;
using PetMap.Models;
using NetTopologySuite.Geometries;

namespace PetMap.Mappings
{
    public static class PetMappers
    {
        public static PetPost MapToPetPost(this PetRequest source)

        {
            return new PetPost
            {
                Name = source.Name,
                Description = source.Description,
                Contact = source.Contact,
                Location = new Point(source.Location!.ToCoordinate),
                Tags = source.Tags,
                FileKey = source.File!.FileName
            };
        }
        
        public static PetResponse MapToPetResponse(this PetPost source)
        {
            return new PetResponse
            {
                Id = source.Id,
                Name = source.Name,
                Description = source.Description,
                Contact = source.Contact,
                Location = new CoordinateDto(source.Location!.Coordinate.X, source.Location.Coordinate.Y),
                Tags = source.Tags,
                FileKey = source.FileKey
            };
        }
    }
}