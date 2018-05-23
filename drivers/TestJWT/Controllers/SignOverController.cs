﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using drivers.Models;
using Drivers.Database;
using Drivers.Security;

namespace Drivers.Controllers
{
    public class SignOverController : ApiController
    {
        SignOverManager _manager = new SignOverManager();

        [HttpPost]
        public IHttpActionResult CreateSignOverRequest(SignOver signOver)
        {
            SignOver result = _manager.CreateSignOverRequest(signOver);

            if (result == null)
            {
                return BadRequest("Data supplied was invalid");
            }

            return Ok(result);
        }
    }
}
