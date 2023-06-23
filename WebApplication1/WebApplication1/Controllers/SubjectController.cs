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
    public class SubjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string sqlConnectionString;
        private readonly ILogger<SubjectController> _logger;

        public SubjectController(IConfiguration configuration, ILogger<SubjectController> logger)
        {
            _configuration = configuration;
            sqlConnectionString = _configuration.GetConnectionString("CURDAppDB");
            _logger = logger;
        }

        [HttpGet]
        public JsonResult getSubject()
        {
            JsonResult result = null;
            _logger.LogInformation("get subject details get from the database");
            try
            {
                string query = "select * from subject;";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

                _logger.LogInformation("get subject details result " + result);
            }
            catch (Exception ex)
            {
                _logger.LogError("LogError while getting subject details from the database");
            }

            return result;
        }

        [HttpGet("{id}")]
        public JsonResult getSubjectById(int id)
        {
            JsonResult result = null;
            _logger.LogInformation("get Subject details by id from the database");
            try
            {
                string query = "select * from subject where subject_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

                _logger.LogInformation("get subject details by id result " + result);

            }
            catch (Exception ex)
            {
                _logger.LogError("LogError while getting Subject details from the database");
            }

            return result;
        }

        [HttpPost]
        public JsonResult addSubject(Subject subject)
        {
            string result;
            _logger.LogInformation("save Subject details to database");
            try
            {

                string query = "Insert into subject values ('" + subject.subjectName + "');";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "Subject saved successfully" : "Failed to save Subject";

                _logger.LogInformation("save subject details result " + result);

            }
            catch (Exception ex)
            {
                result = "Exception caused while saving Subject " + ex;
                _logger.LogError("LogError while getting Subject details from the database");
            }

            return new JsonResult(result);
        }

        [HttpPut]
        public JsonResult updateSubject(Subject subject)
        {
            string result;
               _logger.LogInformation("update subject details get from the database");
            try
            {

                string query = "update subject set subject_name='" + subject.subjectName + "' where subject_id=" + subject.subjectId + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "Subject details updated successfully" : "Failed to update Subject details";

                _logger.LogInformation("update subject details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while updating Subject details " + ex;
                _logger.LogError("LogError while getting Subject details from the database");
            }

            return new JsonResult(result);
        }

        [HttpDelete("{id}")]
        public JsonResult deleteSubject(int id)
        {
            string result;
            _logger.LogInformation("delete Subject details get from the database");
            try
            {
                string query = "delete from subject where subject_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "Subject deleted successfully" : "Failed to delete Subject";

                _logger.LogInformation("delete subject details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while deleting Subject details " + ex;
                _logger.LogError("LogError while getting Subject details from the database");
            }

            return new JsonResult(result);

        }
    }
}
