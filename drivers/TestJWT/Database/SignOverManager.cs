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
        private const int SignOverTokenLength = 10;

        public SignOver CreateSignOverRequest(SignOver signOver)
        {
            using (ManagedConnection connection = new ManagedConnection())
            {
                string query = "INSERT INTO sign_over ('license_plate', 'sender_id', 'receiver_id', 'hashed_token') " +
                               "VALUES ('@licensePlate', '@senderId', '@receiverId', '@hashedToken')";

                string token = GenerateSignOverToken();
                string hashedToken = SecurityManager.CreateHash(token);

                MySqlCommand cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@licensePlate", signOver.LicensePlate);
                cmd.Parameters.AddWithValue("@senderId", signOver.Sender.Id);
                cmd.Parameters.AddWithValue("@receiverId", signOver.Receiver.Id);
                cmd.Parameters.AddWithValue("@hashedToken", hashedToken);
                
                cmd.ExecuteNonQuery();

                signOver.Token = token;

                return signOver;
            }
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