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
    public class AllocateController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string sqlConnectionString;
        private readonly ILogger<AllocateController> _logger;

        public AllocateController(IConfiguration configuration, ILogger<AllocateController> logger)
        {
            _configuration = configuration;
            sqlConnectionString = _configuration.GetConnectionString("CURDAppDB");
            _logger = logger;
        }

        [HttpGet]
        public JsonResult getSubject()
        {
            JsonResult result = null;
            try
            {
                _logger.LogInformation("allocate subject details get from the database");
                string query = "select * from allocatedSubjects;";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

            }
            catch (Exception ex)
            {
                _logger.LogError("LogError while getting allocate subject details from the database");
            }

            return result;
        }

        [HttpGet("{id}")]
        public JsonResult getSubject(int id)
        {
            JsonResult result = null;
            try
            {
                _logger.LogInformation("allocate subject details get from the database by id");
                string query = "select * from allocatedSubjects where teacher_id="+id+";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

            }
            catch (Exception ex)
            {
                _logger.LogError("LogError while getting allocate subject details from the database");
            }

            return result;
        }

        [HttpPost]
        public JsonResult save(AllocatedSubject allo)
        {
            string result;
            try
            {
                _logger.LogInformation("save allocate subject details to the database");
                string query = "Insert into allocatedSubjects values (" + allo.teacherId + ", "+ allo.subjectId+");";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "saved successfully" : "Failed to save";
            }
            catch (Exception ex)
            {
                result = "Exception caused while saving allocatedSubject " + ex;
                _logger.LogError("LogError while saving allocate subject details from the database");
            }

            return new JsonResult(result);
        }

        [HttpDelete("{id}")]
        public JsonResult delete(int id)
        {
            string result;
            try
            {
                _logger.LogInformation("delete allocate subject details get from the database");
                string query = "delete from allocatedSubjects where allocate_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "deleted successfully" : "Failed to delete";
            }
            catch (Exception ex)
            {
                result = "Exception caused while deleting subjects " + ex;
                _logger.LogError("LogError while deleting allocate subject details from the database");
            }

            return new JsonResult(result);

        }
    }
}
