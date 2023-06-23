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
    public class ClassAllocateController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string sqlConnectionString;
        private readonly ILogger<ClassAllocateController> _logger;

        public ClassAllocateController(IConfiguration configuration, ILogger<ClassAllocateController> logger)
        {
            _configuration = configuration;
            sqlConnectionString = _configuration.GetConnectionString("CURDAppDB");
            _logger = logger;
        }

        [HttpGet]
        public JsonResult getClasses()
        {
            JsonResult result = null;
            try
            {
                _logger.LogInformation("get allacated classes from the database");
                string query = "select * from allocatedClassRoom;";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

            }
            catch (Exception ex)
            {
                _logger.LogError("LogError while getting allacated class details from the database");
            }

            return result;
        }

        [HttpGet("{id}")]
        public JsonResult getClassesByTeacher(int id)
        {
            JsonResult result = null;
            try
            {
                _logger.LogInformation("get allacated classed by teacher id from the database");
                string query = "select * from allocatedClassRoom where teacher_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

            }
            catch (Exception ex)
            {
                _logger.LogError("LogError while getting allacated classed from the database");
            }

            return result;
        }

        [HttpPost]
        public JsonResult save(AllocatedClassroom allo)
        {
            string result;
            try
            {
                _logger.LogInformation("save allacated classes to the database");
                string query = "Insert into allocatedClassRoom values (" + allo.teacherId + ", " + allo.classRoomId + ");";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "saved successfully" : "Failed to save";
            }
            catch (Exception ex)
            {
                result = "Exception caused while saving allocated classrooms" + ex;
                _logger.LogError("Error while getting saving allocatedClassRoom details from the database");
            }

            return new JsonResult(result);
        }

        [HttpDelete("{id}")]
        public JsonResult delete(int id)
        {
            string result;
            try
            {
                _logger.LogInformation("delete allacated classed details get from the database");
                string query = "delete from allocatedClassRoom where allocate_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "deleted successfully" : "Failed to delete";
            }
            catch (Exception ex)
            {
                result = "Exception caused while deleting class rooms " + ex;
                _logger.LogError("LogError while deleteing allacated class details from the database");
            }

            return new JsonResult(result);

        }
    }
}
