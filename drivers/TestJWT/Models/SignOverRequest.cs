using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Drivers.Models
{
    public class SignOverRequest
    {
        public string LicensePlate { get; set; }
        public Driver Sender { get; set; }
        public Driver Receiver { get; set; }
        public string Password { get; set; }
    }
}