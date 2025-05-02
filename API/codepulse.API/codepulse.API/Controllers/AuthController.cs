using codepulse.API.Repositories.Interface;
using CodePulse.API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace codepulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRespository tokenRespository;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRespository tokenRespository)
        {
            this.userManager = userManager;
            this.tokenRespository = tokenRespository;
        }

        [HttpPost]
        [Route("login")]

        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            var identityUser = await userManager.FindByEmailAsync(request.Email);

            if(identityUser is not null)
            {
                var checkPasswordresult = await userManager.CheckPasswordAsync(identityUser,request.Password);

                if(checkPasswordresult)
                {
                    var roles = await userManager.GetRolesAsync(identityUser);

                    var jwttoken = tokenRespository.createJwtToken(identityUser, roles.ToList());
                    var response = new LoginResponseDto()
                    {
                        Email = request.Email,
                        Roles = roles.ToList(),
                        Token = jwttoken
                    };
                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or Password is incorrect");

            return ValidationProblem(ModelState); 
        }


        [HttpPost]
        [Route("register")]     
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            //Create Identity user object

            var user = new IdentityUser
            {
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim(),
            };

            var IdentityResult = await userManager.CreateAsync(user, request.Password);
            
            if(IdentityResult.Succeeded)
            {
                //Add role to user
                IdentityResult=await userManager.AddToRoleAsync(user, "Reader");

                if (IdentityResult.Succeeded) {

                    return Ok();
                }
                else
                {
                    if (IdentityResult.Errors.Any())
                    {
                        foreach (var error in IdentityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }

                }
            }
            else
            {
                if (IdentityResult.Errors.Any())
                {
                    foreach (var error in IdentityResult.Errors)
                    {
                        ModelState.AddModelError("",error.Description);
                    }
                }

            }

            return ValidationProblem(ModelState);
        }
    }
}
