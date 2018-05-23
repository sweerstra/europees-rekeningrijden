using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Drivers.Models;
using Drivers.Models;
using Drivers.Security;
using MySql.Data.MySqlClient;
using System.Security.Cryptography;
using System.Text;
using System.Globalization;

namespace Drivers.Database
{
    public class SignOverManager
    {
        private DriverManager _driverManager;
        private const int SignOverTokenLength = 10;

        public SignOverManager()
        {
            _driverManager = new DriverManager();
        }

        public SignOver CreateSignOverRequest(SignOverRequest request)
        {
            if (request == null || request.Sender == null || request.Receiver == null || string.IsNullOrEmpty(request.LicensePlate) || string.IsNullOrEmpty(request.Password))
            {
                return null;
            }

            DriverManager driverManager = new DriverManager();
            Driver verifiedSender = driverManager.Verify(request.Sender.Email, request.Password);
            if (verifiedSender == null)
            {
                //Verifiy password failed, or user was not found by email
                return null;
            }
            request.Sender = verifiedSender;

            using (ManagedConnection connection = new ManagedConnection())
            {
                string licensePlate = request.LicensePlate;
                long senderId = request.Sender.Id;
                long receiverId = request.Receiver.Id;

                if (senderId == 0 || receiverId == 0 || string.IsNullOrEmpty(licensePlate)) return null;

                Driver sender = _driverManager.GetDriver(senderId);
                Driver receiver = _driverManager.GetDriver(receiverId);

                if (sender == null || receiver == null) return null;

                //Use UTC so timezones don't matter if we start checking the signover date
                DateTime startDate = DateTime.UtcNow;

                string query = "INSERT INTO `drivers`.`sign_over` (`LicensePlate`, `sender_id`, `receiver_id`, `HashedToken` `StartDate`) " +
                               "VALUES (@licensePlate, @senderId, @receiverId, @hashedToken, @startDate)";

                string token = GenerateSignOverToken();
                string hashedToken = SecurityManager.CreateHash(token);

                MySqlCommand cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@licensePlate", licensePlate);
                cmd.Parameters.AddWithValue("@senderId", (int)senderId);
                cmd.Parameters.AddWithValue("@receiverId", (int)receiverId);
                cmd.Parameters.AddWithValue("@hashedToken", hashedToken);
                cmd.Parameters.AddWithValue("@startDate", startDate);

                cmd.ExecuteNonQuery();

                SignOver signOver = new SignOver();

                signOver.Sender = sender;
                signOver.Receiver = receiver;
                signOver.Token = token;
                signOver.StartDate = startDate;

                return signOver;
            }
        }

        public bool AcceptSignOverRequest(long signOverId)
        {
            SignOver request = GetSignOverRequest(signOverId);

            if (request == null)
            {
                return false;
            }

            using (ManagedConnection connection = new ManagedConnection())
            {
                request.AcceptDate = DateTime.UtcNow;

                string query = "UPDATE `drivers`.`sign_over` SET AcceptDate = @date WHERE `id` = @id;";

                MySqlCommand cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@id", signOverId);
                cmd.Parameters.AddWithValue("@date", request.AcceptDate.Value.ToString("yyyy/MM/dd HH:mm:ss", CultureInfo.InvariantCulture));

                cmd.ExecuteNonQuery();

                return true;
            }
        }

        public bool VerifySignOverRequest(long signOverId)
        {
            SignOver request = GetSignOverRequest(signOverId);

            if (request == null)
            {
                return false;
            }

            using (ManagedConnection connection = new ManagedConnection())
            {
                request.ConfirmDate = DateTime.UtcNow;

                string query = "UPDATE `drivers`.`sign_over` SET ConfirmDate = @date WHERE `id` = @id;";

                MySqlCommand cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@id", signOverId);
                cmd.Parameters.AddWithValue("@date", request.ConfirmDate.Value.ToString("yyyy/MM/dd HH:mm:ss", CultureInfo.InvariantCulture));

                cmd.ExecuteNonQuery();

                return true;
            }
        }

        public SignOver GetSignOverRequest(long id)
        {
            SignOver signOver;

            using (ManagedConnection connection = new ManagedConnection())
            {
                string query = "SELECT * FROM sign_over WHERE id = @id";
                var cmd = new MySqlCommand(query, connection.Connection);

                cmd.Parameters.AddWithValue("@id", id);
                var reader = cmd.ExecuteReader();
                signOver = reader.AutoMap<SignOver>().FirstOrDefault();
            }

            return signOver;
        }

        public SignOver GetSignOverRequest(string email, string token)
        {
            DriverManager driverManager = new DriverManager();
            Driver driver = driverManager.GetDriver(email);

            if (driver == null)
            {
                return null;
            }
            List<SignOver> possibleSignovers;

            using (ManagedConnection connection = new ManagedConnection())
            {
                string query = "SELECT * FROM sign_over WHERE sender_id = @id OR receiver_id = @id;";
                var cmd = new MySqlCommand(query, connection.Connection);

                cmd.Parameters.AddWithValue("@id", driver.Id);
                var reader = cmd.ExecuteReader();
                possibleSignovers = reader.AutoMap<SignOver>();
            }

            foreach (var signOver in possibleSignovers)
            {
                if (SecurityManager.VerifyHash(token, signOver.HashedToken))
                {
                    return signOver;
                }
            }

            return null;
        }

        private string GenerateSignOverToken()
        {
            string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%.?-=+&", code = string.Empty;

            byte[] data = new byte[1];
            using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
            {
                crypto.GetNonZeroBytes(data);
                data = new byte[SignOverTokenLength];
                crypto.GetNonZeroBytes(data);
            }
            StringBuilder result = new StringBuilder(SignOverTokenLength);
            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length)]);
            }
            return result.ToString();
        }
    }
}