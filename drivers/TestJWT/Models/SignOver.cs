using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Drivers.Models
{
    public class SignOver
    {
        public long Id { get; set; }
        public string LicensePlate { get; set; }
        public int sender_id { get; set; }
        public int receiver_id { get; set; }
        public Driver Sender { get; set; }
        public Driver Receiver { get; set; }
        public string Token { get; set; }
        public string HashedToken { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? AcceptDate { get; set; }
        public DateTime? ConfirmDate { get; set; }
    }
}