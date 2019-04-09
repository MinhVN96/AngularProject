using DemoAngular.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace DemoAngular.Provider
{
    public class TokenProviderMiddleware
    {
        WareHouseDB db = new WareHouseDB();
        private readonly RequestDelegate _next;

        private readonly TokenProviderOptions _options;

        public TokenProviderMiddleware(
            RequestDelegate next,
            IOptions<TokenProviderOptions> options)
        {
            _next = next;
            _options = options.Value;
        }

        public Task Invoke(HttpContext context)
        {
            if (!context.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
            {
                return _next(context);
            }

            if (!context.Request.Method.Equals("POST")
               || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }

            return GenerateToken(context);
        }

        private async Task GenerateToken(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];

            var identity = await GetIdentity(username, password);

            if (identity == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                claims: identity.Claims,
                notBefore: now,
                expires: now.Add(_options.Expiration),
                signingCredentials: _options.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int)_options.Expiration.TotalSeconds,
            };

            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        private Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            var user = db.Accounts.FirstOrDefault(x => x.UserName.Equals(username) && x.Password.Equals(password));

            if (user == null) return null;
            long id = user.ID;
            string ID = Convert.ToString(id);
            IList<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.OtherPhone, ID, null, ClaimsIdentity.DefaultIssuer, "Provider"));

            claims.Add(new Claim(ClaimTypes.Name,user.Name, null, ClaimsIdentity.DefaultIssuer, "Provider"));

            claims.Add(new Claim("UserName",user.UserName));

            return Task.FromResult(new ClaimsIdentity(claims, "Bearer"));
        }

    }
}