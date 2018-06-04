using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Drivers.Service;
using PayPal;
using PayPal.Api;

namespace Drivers.Controllers
{
    [RoutePrefix("api/payment")]
    public class PaymentController : ApiController
    {
        [HttpPost]
        [Route("{invoiceId}/{price}/{returnUri=returnUri}/{cancelUri=cancelUri}")]
        public IHttpActionResult Pay(int invoiceId, double price, string returnUri, string cancelUri)
        {
            var apiContext = PaypalConfiguration.GetAPIContext();

            var payer = new Payer {payment_method = "paypal"};

            // http://localhost:3000/payment
            var redirUrls = new RedirectUrls
            {
                return_url = returnUri,
                cancel_url = cancelUri
            };

            var itemList = new ItemList
            {
                items = new List<Item>
                {
                    new Item
                    {
                        name = "Route Invoice",
                        currency = "GBP",
                        price = price.ToString(CultureInfo.InvariantCulture),
                        quantity = "1",
                        sku = "Traxit"
                    }
                }
            };

            var details = new Details
            {
                tax = "0",
                shipping = "0",
                subtotal = price.ToString()
            };

            var amount = new Amount
            {
                currency = "GBP",
                total = price.ToString(),
                details = details
            };

            var transactionList = new List<Transaction>
            {
                new Transaction
                {
                    description = "Traxit route invoice",
                    invoice_number = invoiceId.ToString(),
                    amount = amount,
                    item_list = itemList
                }
            };

            var payment = new Payment
            {
                intent = "sale",
                payer = payer,
                redirect_urls = redirUrls,
                transactions = transactionList
            };
            var createdPayment = payment.Create(apiContext);
            var payUrl = string.Empty;
            var links = createdPayment.links.GetEnumerator();

            while (links.MoveNext())
            {
                var link = links.Current;
                if (link.rel.ToLower().Trim().Equals("approval_url"))
                {
                    payUrl = link.href;
                }
            }

            return Ok(payUrl);
        }

        [HttpGet]
        [Route("complete/{paymentId=paymentId}/{PayerID=payerId}")]
        public IHttpActionResult CompletePayment(string paymentId, string payerId, string redirectUri)
        {
            var apiContext = PaypalConfiguration.GetAPIContext();
            var paymentExecution = new PaymentExecution() {payer_id = payerId};
            var payment = new Payment {id = paymentId};

            // Execute the payment.
            var executedPayment = payment.Execute(apiContext, paymentExecution);

            var transaction = executedPayment.transactions.First();
            
            return Redirect(new Uri($"{"http://localhost:3000/payment"}?invoiceId={transaction.invoice_number}"));
        }
    }
}