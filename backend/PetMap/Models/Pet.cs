using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using NpgsqlTypes;

namespace PetMap.Models
{
	public enum PetStatus : byte
	{
		Lost = 1,
		Found = 2,
		Return = 3
	}

	public class PetPost
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public DateTime CreateAt { get; set; }

		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime UpdatedAt { get; set; }

		[Required]
		public required PetStatus PetStatus { get; set; }

		[Required]
		public required byte TypePet { get; set; }

		[Required]
		public required DateTime DatePet { get; set; }

		public string? ContactPhone { get; set; }

		public string? ContactEmail { get; set; }

		[Required]
		public required string Description { get; set; }

		[Column(TypeName = "geometry (point)")]
		public Point? Location { get; set; }

		public required string FileKey { get; set; }
		public string? Name { get; set; }

		public int[]? Tags { get; set; } = [];

		public required string UserId { get; set; }

		public User User { get; set; } = null!;

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