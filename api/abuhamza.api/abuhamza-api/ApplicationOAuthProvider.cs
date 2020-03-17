using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Threading.Tasks;
using abuhamza_api.Models;
using abuhamza.repository;

namespace abuhamza_api
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            ////context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            string error = "";
            try
            {
                using (var db = new abuhamzapetstoreEntities())
                {
                    if (db != null)
                    {
                        tblUser user = db.tblUsers.Where(u => u.email == context.UserName && u.password == context.Password).FirstOrDefault();
                        if (user != null)
                        {
                            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                            identity.AddClaim(new Claim("Userid", user.user_id.ToString()));
                            identity.AddClaim(new Claim("Username", user.username));
                            identity.AddClaim(new Claim("Firstname", user.firstname));
                            identity.AddClaim(new Claim("Lastname", user.lastname));
                            identity.AddClaim(new Claim("Email", user.email));
                            identity.AddClaim(new Claim("Contact", user.contact));
                            identity.AddClaim(new Claim("Userrole", user.userRoll));
                            identity.AddClaim(new Claim("Status", user.status));
                            context.Validated(identity);
                        }
                        else
                        {
                            context.SetError("invalid_grant", "Provided username and password is incorrect.");
                            context.Rejected();
                        }
                        return;
                    }
                }
            }
            catch (Exception ex)
            {

                error = ex.Message;
            }
            
        }
    }
}