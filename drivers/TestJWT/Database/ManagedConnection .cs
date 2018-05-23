using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Web.Configuration;

namespace Drivers.Database
{
    public class ManagedConnection : IDisposable
    {
        private MySqlConnection connection = null;

        private string server;
        private string databaseName;
        private string userName;
        private string password;

        public ManagedConnection()
        {
            server = WebConfigurationManager.AppSettings["MySqlServer"];
            databaseName = WebConfigurationManager.AppSettings["MySqlName"];
            userName = WebConfigurationManager.AppSettings["MySqlUser"];
            password = WebConfigurationManager.AppSettings["MySqlPassword"];

            if (!TryConnect())
            {
                throw new Exception("Could not open connection");
            }
        }

        public MySqlConnection Connection
        {
            get { return connection; }
        }

        public bool TryConnect()
        {
            if (connection == null)
            {
                if (String.IsNullOrEmpty(databaseName))
                {
                    return false;
                }
                string connstring = $"Server={server}; database={databaseName}; UID={userName}; password={password}; SslMode=none";

                try
                {
                    connection = new MySqlConnection(connstring);
                    connection.Open();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.ToString());
                    return false;
                }
            }

            return true;
        }

        public void Close()
        {
            connection.Close();
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    if (connection != null)
                    {
                        connection.Close();
                    }
                }

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~ManagedConnection() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}