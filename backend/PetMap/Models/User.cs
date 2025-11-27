using System.ComponentModel.DataAnnotations;


namespace PetMap.Models
{   
    public enum UserRole : byte
    {   
        User = 0,
        Admin = 1,
        Moderator = 2
    }
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string NameLastName { get; set; }
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        public UserRole Role { get; set; }
    }
}