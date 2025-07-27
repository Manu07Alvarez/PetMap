namespace Petmap.Controllers
{

    using Microsoft.AspNetCore.Mvc;
    using PetMap.Dtos;
    using PetMap.Services;


    [ApiController]
    [Route("api/pets")]
    public class PetController(IPetService petService) : ControllerBase
    {

        [HttpGet]
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

        private readonly IPetService petService = petService;

        [HttpPost]
        [ProducesResponseType(typeof(PetRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("AddPet")]
        [Consumes("application/json")]
        public IActionResult AddPet([FromBody] PetRequest petRequest)
        {
            try
            {
                petService.AddPet(petRequest);
                return Created("AddPet", petRequest);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(PetPagedResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("GetAllPets")]
        public async Task<IActionResult> GetAllPets([FromQuery] GetPetPagedRequest request)
        {
            try
            {
                var response = await petService.GetAllPets(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            
        }
    }
}