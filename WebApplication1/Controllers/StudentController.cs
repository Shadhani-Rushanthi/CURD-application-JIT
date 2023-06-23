using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using WebApplication1.Controllers;
using WebApplication1.Modals;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string sqlConnectionString;
        private readonly ILogger<StudentController> _logger;

        public StudentController(IConfiguration configuration, ILogger<StudentController> logger)
        {
            _configuration = configuration;
            sqlConnectionString = _configuration.GetConnectionString("CURDAppDB");
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get()
        {
            JsonResult result = null;
            _logger.LogInformation("Get student details from the database");

            try
            {

                string query = "select * from student";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

                _logger.LogInformation("Get student details result " +result);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error while getting student details from the database");
            }

            return result;
        }

        [HttpPost]
        public JsonResult addNewStudent(Student student) {
            string result;
             _logger.LogInformation("save student details");

            try
            {
                string query = "Insert into student values ('" + student.firstName + "','" + student.lastName + "','" + student.contactPerson + "', " + student.contactNo + " ,'" + student.email + "','" + student.dataOfBirth + "'," + student.age + "," + student.classroomId + ")";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "Student saved successfully" : "Failed to save student";

                _logger.LogInformation("save student details result " + result);

            }
            catch (Exception ex)
            {
                result = "Exception caused while saving student " + ex;
                _logger.LogError("Error while getting student details from the database");
            }

            return new JsonResult(result);
        }

        [HttpPut]
        public JsonResult updateSudent(Student student)
        {
             _logger.LogInformation("Updating Student details");
            string result;
            try
            {

                string query = "update student set first_name='" + student.firstName+
                    "', last_name='" + student.lastName+
                    "', contact_person='" + student.contactPerson+
                    "', contact_no=" + student.contactNo+
                    ", email='" + student.email+
                    "',date_of_birth='" + student.dataOfBirth+
                    "',age=" + student.age+
                    ",classroom_id=" + student.classroomId+
                    "where student_id=" +student.studentId+";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "Student details updated successfully" : "Failed to update student details";

                _logger.LogInformation("update student details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while updating student details " + ex;
                //_logger.Error("Error while getting student details from the database");
            }

            return new JsonResult(result);
        }
        
        [HttpDelete("{id}")]
        public JsonResult deleteStudent(int id)
        {
            string result;
            _logger.LogInformation("delete Student details get from the database");
            try
            {
                string query = "delete from student where student_id=" + id + ";";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                int i = db.DataInsertUpdateDelete(query);
                result = (i == 1) ? "Student deleted successfully" : "Failed to delete student";

                _logger.LogInformation("delete student details result " + result);
            }
            catch (Exception ex)
            {
                result = "Exception caused while deleting student " + ex;
                //_logger.Error("Error while getting student details from the database");
            }

            return new JsonResult(result);

        }

        [HttpGet("{id}")]
        public JsonResult getstudentReport(int id)
        {
            JsonResult result = null;
            _logger.LogInformation("get details for student report");
            try
            {
                string query = "select subject_id, th.teacher_id from allocatedSubjects asj inner join (select teacher_id from allocatedClassRoom ac inner join student s " +
                    "on s.classroom_id = ac.classroom_id where student_id = " + id + ") as th on asj.teacher_id = th.teacher_id";
                DatabaseController db = new DatabaseController(sqlConnectionString);
                result = db.getDataSet(query);

                _logger.LogInformation("get details for student report " + result);

            }
            catch (Exception ex)
            {
                //_logger.Error("Error while getting student details from the database");
            }

            return result;
        }
    }
}
