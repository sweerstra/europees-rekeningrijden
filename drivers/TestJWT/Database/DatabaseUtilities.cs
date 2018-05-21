using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using System.Reflection;
using System.Collections;

namespace Drivers.Database
{
    public static class DatabaseUtilities
    {

        public static List<T> AutoMap<T>(this MySqlDataReader reader) where T : new()
        {
            string idName = typeof(T).GetProperties().FirstOrDefault(p => p.Name.ToLowerInvariant() == "id" && (p.PropertyType == typeof(int) || p.PropertyType == typeof(long))).Name;
            if (string.IsNullOrEmpty(idName))
            {
                throw new Exception("Can only map to classes that have an id property");
            }

            var returnList = new List<T>();
            var props = typeof(T).GetProperties();
            while (reader.Read())
            {
                T returnValue = new T();

                for (int i = 0; i < reader.FieldCount; i++)
                {
                    string fieldName = reader.GetName(i);

                    PropertyInfo currentProperty = props.FirstOrDefault(p => p.Name.ToLowerInvariant() == fieldName.ToLowerInvariant());
                    if (currentProperty != null)
                    {
                        currentProperty.SetValue(returnValue, reader.GetValue(i));
                    }
                }

                returnList.Add(returnValue);
            }

            return returnList;
        }
    }
}