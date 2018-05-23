using System.Web.Http;
using Drivers.Models;
using Drivers.Database;

namespace Drivers.Controllers
{
    public class DriverController : ApiController
    {
        private DriverManager _manager = new DriverManager();

        [HttpPost]
        public IHttpActionResult VerifyDriverDetails(Driver driver)
        {
            bool verified = _manager.VerifyDriverDetails(driver);

            if (verified)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}
