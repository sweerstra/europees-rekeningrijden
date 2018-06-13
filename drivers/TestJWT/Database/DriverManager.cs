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

        public Driver GetDriver(long id)
        {
            return GetAllDrivers().FirstOrDefault(d => d.Id == id);
        }

        public Driver GetDriver(string email)
        {
            return GetAllDrivers().FirstOrDefault(d => d.Email.ToLowerInvariant() == email.ToLowerInvariant());
        }

        public Driver Verify(string email, string password)
        {
            if (string.IsNullOrEmpty(email))
            {
                return null;
            }

            Driver driver = null;
            using (ManagedConnection connection = new ManagedConnection())
            {
                string query = "SELECT * FROM Driver where email = @email";
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

        public Driver Register(DriverRequest driver)
        {
            using (ManagedConnection connection = new ManagedConnection())
            {
                string query = "SELECT * FROM Driver where email = @email";
                var cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@email", driver.Email);
                var reader = cmd.ExecuteReader();
                if (reader.AutoMap<Driver>().Count > 0)
                {
                    return null;
                }
                reader.Dispose();
                cmd.Dispose();

                query =
                    "INSERT INTO `drivers`.`Driver` (`Email`, `Hashedpassword`, `Firstname`, `LastName`, `OwnerId`) VALUES (@email, @hashedPassword, @firstName, @lastName, @ownerId)";
                string hashedPassword = SecurityManager.CreateHash(driver.Password);
                cmd = new MySqlCommand(query, connection.Connection);
                cmd.Parameters.AddWithValue("@email", driver.Email);
                cmd.Parameters.AddWithValue("@hashedPassword", hashedPassword);
                cmd.Parameters.AddWithValue("@firstName", driver.FirstName);
                cmd.Parameters.AddWithValue("@lastName", driver.LastName);
                cmd.Parameters.AddWithValue("@ownerId", driver.OwnerId);
                if (cmd.ExecuteNonQuery() > 0)
                {
                    return GetDriver(driver.Email);
                }
                return null;
            }
        }
    }
}