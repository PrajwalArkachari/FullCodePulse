using Microsoft.AspNetCore.Identity;

namespace codepulse.API.Repositories.Interface
{
    public interface ITokenRespository
    {
        public string createJwtToken(IdentityUser user, List<string> roles);
    }
}
