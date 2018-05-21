using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Permissions;
using System.Web.Http;
using Drivers.Security;

namespace Drivers.Controllers
{
    //the authorize attribute secures the endpoints of the controller
 
    public class SecurityTestController : ApiController
    {
    [Security.Security]
        public String Get()
        {
            return "Success";
        }

    }
}
