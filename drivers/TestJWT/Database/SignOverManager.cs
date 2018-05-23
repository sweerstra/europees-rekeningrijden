using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using drivers.Models;
using Drivers.Models;
using Drivers.Security;
using MySql.Data.MySqlClient;

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

        public SignOver CreateSignOverRequest(SignOver signOver)
        {
            using (ManagedConnection connection = new ManagedConnection())
            {
                string licensePlate = signOver.LicensePlate;
                long senderId = signOver.Sender.Id;
                long receiverId = signOver.Receiver.Id;

                if (senderId == 0 || receiverId == 0 || string.IsNullOrEmpty(licensePlate)) return null;

                Driver sender = _driverManager.GetDriver(senderId);
                Driver receiver = _driverManager.GetDriver(receiverId);

                if (sender == null || receiver == null) return null;

                DateTime startDate = DateTime.Now;

                string query = "INSERT INTO `drivers`.`sign_over` (`license_plate`, `sender_id`, `receiver_id`, `hashed_token` `start_date`) " +
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
                request.ConfirmDate = DateTime.Now;

                string query = "UPDATE `drivers`.`sign_over` SET confirm_date WHERE `id` = @id; ";
                
                MySqlCommand cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@id", signOverId);

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
                request.ConfirmDate = DateTime.Now;

                string query = "UPDATE `drivers`.`sign_over` SET verify_date WHERE `id` = @id; ";

                MySqlCommand cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@id", signOverId);

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

        private string GenerateSignOverToken()
        {
            string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%.?-=+&", code = string.Empty;

            Random random = new Random();

            for (var i = 0; i <= SignOverTokenLength; i++)
            {
                code += chars[random.Next(chars.Length)];
            }

            return code;
        }
    }
}