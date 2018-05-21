using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Drivers.Models;

namespace drivers.Models
{
    public class SignOver
    {
        public long Id { get; set; }
        public string LicensePlate { get; set; }
        public Driver Sender { get; set; }
        public Driver Receiver { get; set; }
        public string Token { get; set; }
        public string HashedToken { get; set; }
        public DateTime TransferDate { get; set; }
    }
}