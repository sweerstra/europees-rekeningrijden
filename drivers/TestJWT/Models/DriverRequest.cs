using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Drivers.Models
{
    public class DriverRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long OwnerId { get; set; }
    }
}