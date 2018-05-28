using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Drivers.Models;

namespace Drivers.Models
{
    public class Invoice
    {
        public long id { get; set; }
        public int billingMonth { get; set; }
        public byte[] conditions { get; set; }
        public DateTime? dateOfPayment { get; set; }
        public double distanceTravelled { get; set; }
        public string emissionCategory { get; set; }
        public int? paid { get; set; }
        public double totalAmount { get; set; }
        public string trackerId { get; set; }
        public long? vehicle_id { get; set; }
        public long userId { get; set; }

        public Driver user { get; set; }
    }
}