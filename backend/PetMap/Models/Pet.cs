using System.ComponentModel.DataAnnotations;
using NetTopologySuite.Geometries;

namespace PetMap.Models
{
    public class PetPost
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Contact { get; set; }

        [Required]
        public required string Description { get; set; }
        
        public Point? Location { get; set; }
        
        public string? Name { get; set; }
        public int[]? Tags { get; set; } = [];

    }
    
    public class Tags
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }
    }
}