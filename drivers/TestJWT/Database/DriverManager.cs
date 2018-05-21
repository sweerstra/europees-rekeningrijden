using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using Drivers.Database;
using Drivers.Models;
using Drivers.Security;

namespace Drivers.Database
{
    public class DriverManager
    {
        public DriverManager()
        {
           
        }

        public bool VerifyDriverDetails(Driver driver)
        {
            List<Driver> drivers = GetAllDrivers();

            return drivers
                .Any(d => d.Email == driver.Email 
                && d.FirstName == driver.FirstName 
                && d.LastName == driver.LastName);
        }

        public List<Driver> GetAllDrivers()
        {
            List<Driver> drivers = new List<Driver>();
            using (ManagedConnection connection = new ManagedConnection())
            {
                string query = "SELECT * FROM Driver";
                var cmd = new MySqlCommand(query, connection.Connection);
                var reader = cmd.ExecuteReader();

                drivers = reader.AutoMap<Driver>();
            }

            //using (ManagedConnection invoiceConnection = new ManagedConnection())
            //{
            //    foreach (var driver in drivers)
            //    {
            //        string invoiceQuery = "select * FROM invoice WHERE userId = @userId";
            //        var invoiceCmd = new MySqlCommand(invoiceQuery, invoiceConnection.Connection);
            //        invoiceCmd.Parameters.AddWithValue("@userId", driver.Id);
            //        var invoiceReader = invoiceCmd.ExecuteReader();
            //        driver.Invoices = invoiceReader.AutoMap<Invoice>();
            //        foreach (var invoice in driver.Invoices)
            //        {
            //            invoice.user = driver;
            //        }
            //    }
            //}

            return drivers;
        }

        public Driver GetDriver(int id)
        {
            return GetAllDrivers().FirstOrDefault(d => d.Id == id);
        }

        public Driver GetDriver(string email)
        {
            return GetAllDrivers().FirstOrDefault(d => d.Email.ToLowerInvariant() == email.ToLowerInvariant());
        }

        public Driver Verify(string email, string password)
        {
            Driver driver = null;
            using (ManagedConnection connection = new ManagedConnection())
            {
                string query = "SELECT * FROM user where email = @email";
                var cmd = new MySqlCommand(query, connection.Connection);

                cmd.Parameters.AddWithValue("@email", email);
                var reader = cmd.ExecuteReader();
                driver = reader.AutoMap<Driver>().FirstOrDefault();
            }

            if (driver == null)
            {
                return null;
            }
            if (SecurityManager.VerifyHash(password, driver.HashedPassword))
            {
                return driver;
            }
            return null;
        }

        public Driver Register(string email, string password)
        {
            Driver driver = null;
            using (ManagedConnection connection = new ManagedConnection())
            {
                string query = "SELECT * FROM user where email = @email";
                var cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@email", email);
                var reader = cmd.ExecuteReader();
                if (reader.AutoMap<Driver>().Count > 0)
                {
                    throw new ArgumentException($"Account with email {email} already exists");
                }
                reader.Dispose();
                cmd.Dispose();

                query = "INSERT INTO user ('id', 'email', 'hashedpassword') VALUES (2, '@email', '@hashedPassword')";
                string hashedPassword = SecurityManager.CreateHash(password);
                cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@email", email);
                cmd.Parameters.AddWithValue("@hashedPassword", hashedPassword);
                cmd.ExecuteNonQuery();

                driver = new Driver()
                {
                    Email = email,
                    HashedPassword = hashedPassword,
                    Invoices = new List<Invoice>(),
                    Id = 2
                };
                return driver;
            }
        }
    }
}