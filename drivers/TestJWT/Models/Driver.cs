using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Drivers.Models;

namespace Drivers.Models
{
    public class Driver
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Invoice> Invoices { get; set; }
    }
}