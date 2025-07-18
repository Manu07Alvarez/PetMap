namespace Petmap.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using PetMap.Dtos;
    using PetMap.Services;

    [ApiController]
    [Route("api/[controller]")]
    public class PetController(PetService petService) : ControllerBase
    {

        [Route("/error-development")]
        public IActionResult HandleErrorDevelopment(
            [FromServices] IHostEnvironment hostEnvironment)
        {
            if (!hostEnvironment.IsDevelopment())
            {
                return NotFound();
            }

            var exceptionHandlerFeature =
                HttpContext.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>()!;

            return Problem(
                detail: exceptionHandlerFeature.Error.StackTrace,
                title: exceptionHandlerFeature.Error.Message);
        }

        private readonly PetService petService = petService;

        [HttpGet("pets")]
        public async Task<IActionResult> GetAllPets([FromQuery] GetPetPagedRequest request)
        {
            var response = await petService.GetAllPets(request);
            return Ok(response);
        }
    }
}