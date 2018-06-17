using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Drivers.Models;
using Drivers.Service;
using Google.Protobuf.WellKnownTypes;
using Newtonsoft.Json.Linq;
using PayPal;
using PayPal.Api;

namespace Drivers.Controllers
{
    [RoutePrefix("api/payment")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PaymentController : ApiController
    {

        private const String invoiceURL = "http://192.168.24.36:11080/government/api/invoice/";

        [HttpPost]
        [Route("{returnUri=returnUri}/{cancelUri=cancelUri}")]
        public IHttpActionResult Pay(PaymentRequest request, string returnUri, string cancelUri)
        {
            var apiContext = PaypalConfiguration.GetAPIContext();

            var payer = new Payer { payment_method = "paypal" };

            // http://localhost:3000/payment
            var redirUrls = new RedirectUrls
            {
                return_url = returnUri,
                cancel_url = cancelUri
            };

            string price = request.Price.ToString(CultureInfo.InvariantCulture);


            var itemList = new ItemList
            {
                items = new List<Item>
                {
                    new Item
                    {
                        name = "Route Invoice",
                        currency = "GBP",
                        price = price,
                        quantity = "1",
                        sku = "Traxit"
                    }
                }
            };

            var details = new Details
            {
                tax = "0",
                shipping = "0",
                subtotal = price
            };

            var amount = new Amount
            {
                currency = "GBP",
                total = price,
                details = details
            };

            var transactionList = new List<Transaction>
            {
                new Transaction
                {
                    description = "Traxit route invoice",
                    invoice_number = request.InvoiceId.ToString(),
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
        [Route("complete")]
        public IHttpActionResult CompletePayment(string paymentId, string payerId)
        {
            var apiContext = PaypalConfiguration.GetAPIContext();
            var paymentExecution = new PaymentExecution() { payer_id = payerId };
            var payment = new Payment { id = paymentId };

            var executedPayment = payment.Execute(apiContext, paymentExecution);

            Transaction transaction = executedPayment.transactions.First();

            InvoiceToPaid(Convert.ToInt32(transaction.invoice_number));

            return Redirect(new Uri($"{"http://localhost:3000/payment/" + paymentId}?invoiceId={transaction.invoice_number}"));
        }

        public async Task InvoiceToPaid(int invoiceId)
        {
            string url = invoiceURL + invoiceId + "/paid";

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            StringContent content = new System.Net.Http.StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PutAsync(url, content);
        }

    


    }
}