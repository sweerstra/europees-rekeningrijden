using System.Web.Http;
using Drivers.Models;
using Drivers.Database;
using System.Web.Http.Cors;

namespace Drivers.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/driver")]
    public class DriverController : ApiController
    {
        private DriverManager _manager = new DriverManager();

        [HttpPost]
        [Route("verify")]
        public IHttpActionResult VerifyDriverDetails(Driver driver)
        {
            bool verified = _manager.VerifyDriverDetails(driver);

            if (verified)
            {
                return Ok("Ok");
            }

            return NotFound();
        }


        [HttpPost]
        public IHttpActionResult Register(DriverRequest driverRequest)
        {
            Driver driver = _manager.Register(driverRequest);

            if (driver != null)
            {
                return Ok(driver);
            }

            return BadRequest();
        }
    }
}
