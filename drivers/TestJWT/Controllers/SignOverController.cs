using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Drivers.Models;
using Drivers.Database;
using Drivers.Security;

namespace Drivers.Controllers
{
    [RoutePrefix("api/sign-over")]
    public class SignOverController : ApiController
    {
        SignOverManager _manager = new SignOverManager();
        private int SIGNOVER_EXPIRATION_MINUTES = 10;

        [Route("request")]
        [HttpPost]
        public IHttpActionResult CreateSignOverRequest(SignOverRequest signOver)
        {
            SignOver result = _manager.CreateSignOverRequest(signOver);

            if (result == null)
            {
                return BadRequest("Data supplied was invalid");
            }

            return Ok(result);
        }

        [Route("confirm")]
        [HttpPost]
        public IHttpActionResult AcceptSignOverRequest(SignOverVerification verification)
        {
            DriverManager driverManager = new DriverManager();
            Driver verifiedDriver = driverManager.Verify(verification.Email, verification.Password);

            if (verifiedDriver == null)
            {
                return BadRequest("Data supplied was invalid");
            }

            SignOver signOver = _manager.GetSignOverRequest(verification.Email, verification.Token);

            if (signOver == null)
            {
                return BadRequest("Data supplied was invalid");
            }

            if (verifiedDriver.Id == signOver.receiver_id)
            {
                //eerste verficatie van ontvanger
                if (DateTime.UtcNow.Subtract(signOver.StartDate).TotalMinutes > SIGNOVER_EXPIRATION_MINUTES)
                {
                    return BadRequest("SignOver request expired");
                }

                if (signOver.AcceptDate.HasValue)
                {
                    return BadRequest("Already accepted");
                }

                return Ok(_manager.AcceptSignOverRequest(signOver.Id));
            }
            else if (verifiedDriver.Id == signOver.sender_id)
            {
                //tweede verificatie van verzender
                if (!signOver.AcceptDate.HasValue)
                {
                    //ontvanger heeft nog niet bevestigd
                    return BadRequest("SignOver not accepted by receiver yet");
                }


                if (signOver.ConfirmDate.HasValue)
                {
                    return BadRequest("Already confirmed");
                }

                if (DateTime.UtcNow.Subtract(signOver.AcceptDate.Value).TotalMinutes > SIGNOVER_EXPIRATION_MINUTES)
                {
                    return BadRequest("SignOver request expired");
                }

                return Ok(_manager.VerifySignOverRequest(signOver.Id));
            }

            return BadRequest("Data supplied was invalid");
        }
    }
}
