using System.Web.Http;
using Drivers.Models;
using Drivers.Database;
using System.Web.Http.Cors;

namespace Drivers.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DriverController : ApiController
    {
        private DriverManager _manager = new DriverManager();

        [HttpPost]
        public IHttpActionResult VerifyDriverDetails(Driver driver)
        {
            bool verified = _manager.VerifyDriverDetails(driver);

            if (verified)
            {
                return Ok("Ok");
            }

            return NotFound();
        }
    }
}
