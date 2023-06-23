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
    public class ClassRoomController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string sqlConnectionString;
        private readonly ILogger<ClassRoomController> _logger;

        public ClassRoomController(IConfiguration configuration, ILogger<ClassRoomController> logger)
        {
            _configuration = configuration;
            sqlConnectionString = _configuration.GetConnectionString("CURDAppDB");
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            JsonResult result = null;
            _logger.LogInformation("ClassRoom details get from the database");
            try
            {
                string query = "select * from classRoom;";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

                _logger.LogInformation("Get student details result " + result);
            }
            catch (Exception ex)
            {
                _logger.LogError("LogErro while getting ClassRoom details from the database");
            }

            return result;
        }

        [HttpGet("{id}")]
        public JsonResult getClassRoomById(int id)
        {
            JsonResult result = null;
            _logger.LogInformation("ClassRoom details get by id from the database");
            try
            {
                string query = "select * from classRoom where classroom_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

                _logger.LogInformation("Get classrom details by id result " + result);
            }
            catch (Exception ex)
            {
                _logger.LogError("error while getting ClassRoom details from the database");
            }

            return result;
        }

        [HttpPost]
        public JsonResult addNewClassRoom(ClassRoom classroom)
        {
            string result;
            _logger.LogInformation("save ClassRoom details to  the database");
            try
            {

                string query = "Insert into classRoom values ('" + classroom.className +"');";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "ClassRoom saved successfully" : "Failed to save ClassRoom";

                _logger.LogInformation("save classroom details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while saving ClassRoom " + ex;
                _logger.LogError("LogErro while saving ClassRoom details from the database");
            }

            return new JsonResult(result);
        }

        [HttpPut]
        public JsonResult updateClassRoom(ClassRoom classRoom)
        {
            string result;
            _logger.LogInformation("update ClassRoom details");
            try
            {

                string query = "update ClassRoom set classroom_name='" + classRoom.className +"' where classRoom_id=" + classRoom.classRoomId + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "ClassRoom details updated successfully" : "Failed to update ClassRoom details";

                _logger.LogInformation("update  clasroom details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while updating ClassRoom details " + ex;
                _logger.LogError("LogErro while updating ClassRoom details from the database");
            }

            return new JsonResult(result);
        }

        [HttpDelete("{id}")]
        public JsonResult deleteClassRoom(int id)
        {
            string result;
            _logger.LogInformation("delete ClassRoom details get from the database");
            try
            {
                string query = "delete from ClassRoom where classroom_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "ClassRoom deleted successfully" : "Failed to delete ClassRoom";

                _logger.LogInformation("delete student details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while deleting ClassRoom " + ex;
                _logger.LogError("LogErro while getting ClassRoom details from the database");
            }

            return new JsonResult(result);

        }
    }
}
