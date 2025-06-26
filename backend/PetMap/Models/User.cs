using System.ComponentModel.DataAnnotations;

namespace PetMap.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class Admin : User
    {
        public string Role { get; set; } = "Admin";
    }

    public class Moderator : User
    {
        public string Role { get; set; } = "Moderator";
    }
}