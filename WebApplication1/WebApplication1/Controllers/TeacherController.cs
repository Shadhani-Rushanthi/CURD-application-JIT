using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using WebApplication1.Modals;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string sqlConnectionString;
        private readonly ILogger<TeacherController> _logger;

        public TeacherController(IConfiguration configuration, ILogger<TeacherController> logger)
        {
            _configuration = configuration;
            sqlConnectionString = _configuration.GetConnectionString("CURDAppDB");
            _logger = logger;
        }

        [HttpGet]
        public JsonResult getTeacher()
        {
            JsonResult result = null;
            _logger.LogInformation("get teacher details get from the database");
            try
            {
                string query = "select * from teacher;";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

                _logger.LogInformation("Get teacher details result " + result);
            }
            catch (Exception ex)
            {
                _logger.LogError("LogError while getting teacher details from the database");
            }

            return result;
        }

        [HttpGet("{id}")]
        public JsonResult getTeacherById(int id)
        {
            JsonResult result = null;
            _logger.LogInformation("Teacher details get by id from the database");
            try
            {
                string query = "select * from teacher where teacher_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

                _logger.LogInformation("Get teacher details by id result " + result);
            }
            catch (Exception ex)
            {
                _logger.LogError("LogError while getting Teacher details by id from the database");
            }

            return result;
        }

        [HttpPost]
        public JsonResult addTeacher(Teacher teacher)
        {
            string result;
            _logger.LogInformation("save teacher details get from the database");
            try
            {
                string query = "Insert into teacher values ('" + teacher.firstName+ "', '"+teacher.lastName+"', "+ teacher.contactNo +", '"+ teacher.email+"');";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "Teacher saved successfully" : "Failed to save Teacher";

                _logger.LogInformation("save teacher details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while saving Teacher " + ex;
                _logger.LogError("LogError while gettsavinging Teacher details");
            }

            return new JsonResult(result);
        }

        [HttpPut]
        public JsonResult updateTeacher(Teacher teacher)
        {
            string result;
            _logger.LogInformation("update details get from the database");
            try
            {
                string query = "update teacher set first_name='" + teacher.firstName +
                    "', last_name='" + teacher.lastName +
                    "', contact_no=" + teacher.contactNo +
                    ", email='" + teacher.email +
                    "'where teacher_id=" + teacher.teacherId + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "Teacher details updated successfully" : "Failed to update Teacher details";
                _logger.LogInformation("update teacher details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while updating Teacher details " + ex;
                _logger.LogError("LogError while updaing Teacher details from the database");
            }

            return new JsonResult(result);
        }

        [HttpDelete("{id}")]
        public JsonResult deleteTeacher(int id)
        {
            string result;
            _logger.LogInformation("delete Teacher details get from the database");
            try
            {
                string query = "delete from teacher where teacher_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "Teacher deleted successfully" : "Failed to delete Teacher";

                _logger.LogInformation("delete teacher details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while deleting Teacher " + ex;
                _logger.LogError("LogError while deleteing Teacher details from the database");
            }

            return new JsonResult(result);

        }
    }
}
