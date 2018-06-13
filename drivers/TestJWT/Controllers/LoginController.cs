using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web;
using System.Web.Http;
using Drivers.Security;
using System.Web.Http.Cors;
using System.Web.Http.Routing.Constraints;
using Drivers.Database;
using Drivers.Models;

namespace Drivers.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        [HttpPost]
        [BasicAuthentication]
        public IHttpActionResult Authenticate()
        {
            object email;
            object password;
            Request.Properties.TryGetValue("email", out email);
            Request.Properties.TryGetValue("password", out password);

            DriverManager driverManager = new DriverManager();
            Driver verifiedSender = driverManager.Verify(email as string, password as string);
            if (verifiedSender != null)
            {
                string token = createToken(email.ToString(), verifiedSender.Id , verifiedSender.OwnerId);

                return Ok(token);
            }

            return Unauthorized();
        }

        private string createToken(string email, long id, long ownerId)
        {
            DateTime issuedAt = DateTime.UtcNow;
            DateTime expires = DateTime.UtcNow.AddDays(1);

            var tokenHandler = new JwtSecurityTokenHandler();

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, email),
                new Claim("id", id.ToString()),
                new Claim("ownerId", ownerId.ToString())
            });

            const string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
            var now = DateTime.UtcNow;
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);

            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: "http://localhost:50191", audience: "http://localhost:50191",
                        subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}
