using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace codepulse.API.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "4bb0fc28-1c06-4c6a-a9ad-b6a5af78e26c";
            var writerRoleId = "70cb8904-c877-413b-a2f2-d820f99ad6bd";

            //Create reader and writer roles

            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp= readerRoleId
                    
                },
                new IdentityRole()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp= writerRoleId
                }
            };

            //seed the roles

            builder.Entity<IdentityRole>().HasData(roles);


            //create a admin user

            var adminUserId = "46fb26fd-d8c3-4366-bf83-4edf958aa6ae";
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "admin@codepulse.com",
                Email = "admin@codepulse.com",
                NormalizedEmail = "admin@codepulse.com".ToUpper(),
                NormalizedUserName = "admin@codepulse.com".ToUpper()

            };
            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Prajwal@123");

            builder.Entity<IdentityUser>().HasData(admin);

            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId = adminUserId,
                    RoleId = readerRoleId
                },
                new()
                {
                    UserId = adminUserId,
                    RoleId = writerRoleId
                }

            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);

        }
    }
}
