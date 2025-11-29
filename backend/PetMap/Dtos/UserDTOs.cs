namespace PetMap.Dtos
{
	public record class UserResponseDTO(
		string Id,
		string NameLastName,
		string Email,
		IEnumerable<string> Roles
	);

	public record class UserWithRolesResponse(
		string Id,
		string UserName,
		string Email,
		IEnumerable<string> Roles
	);

	public record class LoginDTO(
		string Email,
		string Password
	);

	public record class RegisterDTO(
		string Name,
		string LastName,
		string Email,
		string Password
	);
}