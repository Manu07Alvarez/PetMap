using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using NpgsqlTypes;

namespace PetMap.Models
{

    public class PetPost
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required string Contact { get; set; }

        [Required]
        public required string Description { get; set; }

        [Column(TypeName = "geometry (point)")]
        public Point? Location { get; set; }
        
        public string? Name { get; set; }

        public int[]? Tags { get; set; } = [];

       // public NpgsqlTsVector? SearchVector { get; set; }

    }
    
    public class Tags
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }
    }
}