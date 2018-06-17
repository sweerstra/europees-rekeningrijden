using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
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

        private const string GovernmentURL = "http://192.168.24.36:11080/government/";

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
                SetOwnerUsesBillrider(driver.OwnerId);
                return Ok(driver);
            }

            return BadRequest();
        }

        public async Task SetOwnerUsesBillrider(long ownerId)
        {
            string url = GovernmentURL + "api/owner/" + ownerId + "/usesbillrider";

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            StringContent content = new System.Net.Http.StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PutAsync(url, content);
        }
    }
}


