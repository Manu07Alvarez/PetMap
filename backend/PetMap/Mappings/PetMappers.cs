
using PetMap.Dtos;
using PetMap.Models;
using NetTopologySuite.Geometries;
using Amazon.S3.Model;

namespace PetMap.Mappings
{
    public static class PetMappers
    {
        public static PetPost MapToPetPost(this PostPetRequest source)

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
        
        public static async Task<GetPetResponse> MapToPetResponse(this PetPost source, Stream stream_file)
        {
            
            using MemoryStream memoryStream = new();
            await stream_file.CopyToAsync(memoryStream);
            string file = Convert.ToBase64String(memoryStream.ToArray());
            return new GetPetResponse(
                id: source.Id,
                contact: source.Contact,
                description: source.Description,
                stream_file: file,
                location: new CoordinateDto(source.Location!.X, source.Location!.Y),
                name: source.Name,
                tags: source.Tags
            );

        }
    }
}