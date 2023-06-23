using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Data;
using System.Data.SqlClient;

namespace WebApplication1.Controllers
{
    public class DatabaseController : Controller
    {
        SqlConnection _connection;
        SqlCommand _command;
        SqlDataReader _reader;
        DataTable _dataTable;

        public DatabaseController(string conString)
        {
            _connection = new SqlConnection(conString);
        }

        public int DataInsertUpdateDelete(string query)
        {
            int status;

            try
            {
                using (_connection)
                {
                    _connection.Open();
                    using (_command = new SqlCommand(query, _connection))
                    {
                        status = _command.ExecuteNonQuery();
                        _connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                _connection.Close();
                throw ex;
            }
            return status;
        }

        public JsonResult getDataSet(string query) {
            try
            {
                using(_connection)
                {
                    _connection.Open();
                    using(_command = new SqlCommand(query, _connection))
                    {
                        _reader = _command.ExecuteReader();
                        _dataTable = new DataTable();
                        _dataTable.Load(_reader);
                        _reader.Close();
                        _connection.Close();
                    }
                }
            }
            catch(Exception ex)
            {
                _connection.Close();
                throw ex;
            }
            return new JsonResult(_dataTable);
        }
    }
}
