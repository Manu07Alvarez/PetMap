
using PetMap.Dtos;
using PetMap.Models;
using NetTopologySuite.Geometries;
using Amazon.S3.Model;

namespace PetMap.Mappings
{
    public static class PetMappers
    {
        
        /// <summary>
        /// Maps the given PostPetRequest to a PetPost.
        /// </summary>
        /// <param name="source">The PostPetRequest to map.</param>
        /// <returns>The mapped PetPost.</returns>
        public static PetPost MapToPetPost(this PostPetRequest source)
        {
					return new PetPost
					{
						Name = source.Name,
						DatePet = source.DatePet,
						TypePet = source.TypePet,
						Description = source.Description,
						ContactPhone = source.Contact,
						PetStatus = (PetStatus)source.PetStatus,
						Location = new Point(source.Location!.ToCoordinate),
						Tags = source.Tags,
						FileKey = source.File!.FileName,
						UserId = source.UserId
					};
        }
        
        /// <summary>
        /// Maps the given PetPost and a Stream to a GetPetResponse.
        /// </summary>
        /// <param name="source">The PetPost to map.</param>
        /// <param name="stream_file">The Stream containing the file associated with the Pet.</param>
        /// <returns>The mapped GetPetResponse.</returns>
        public static async Task<GetPetResponse> MapToPetResponse(this PetPost source, Stream stream_file)
        {
            
            using MemoryStream memoryStream = new();
            await stream_file.CopyToAsync(memoryStream);
            string file = Convert.ToBase64String(memoryStream.ToArray());
            return new GetPetResponse(
                id: source.Id,
                date_pet: source.DatePet,
                type_pet: source.TypePet,
                pet_status: (byte)source.PetStatus,
                contact_email: source.ContactEmail ?? string.Empty,
                contact_phone: source.ContactPhone ?? string.Empty,
                description: source.Description,
                stream_file: file,
                location: new CoordinateDto(source.Location!.X, source.Location!.Y),
                name: source.Name,
                tags: source.Tags,
								autor: source.UserId
            );

        }
    }
}