using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Http.Filters;

namespace Drivers.Security
{


    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
            else
            {
                string authenticationString = actionContext.Request.Headers.Authorization.Parameter;
                string originalString = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationString));

                string email = originalString.Split(':')[0];
                string password = originalString.Split(':')[1];

                actionContext.Request.Properties["email"] = email;
                actionContext.Request.Properties["password"] = password;
            }

            base.OnAuthorization(actionContext);
        }
    }
}