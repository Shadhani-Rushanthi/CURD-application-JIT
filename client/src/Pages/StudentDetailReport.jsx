import React from 'react'
import './allocateStyles.sass'
import {FormGroup, Label, Input, Form, Col, Button, Table, Modal, ModalBody, ModalFooter} from 'reactstrap'
import { useState } from 'react'
import UseFetch from '../Hooks/UseFetch'
import {variables} from '../variables.js'
import axios from 'axios'
import { useEffect } from 'react'

const StudentDetailReport = () => {
    
    let StudentURL = variables.API_URL + 'Student'
    let teacherURL = variables.API_URL + 'Teacher'
    let subjectURL = variables.API_URL + 'Subject'
    let allocateSubjectURL = variables.API_URL + 'Allocate'
    let allocateClassURL = variables.API_URL + 'ClassAllocate'
    let classURL = variables.API_URL + 'ClassRoom'
    
    var {data, loading, error} = UseFetch(StudentURL);
    const[students, setStudents] =useState([])
    const[teachers, setTeachers] =useState([])
    const[subjects, setSubjects] =useState([])
    const[classrooms, setClassrooms] =useState([])
    
    const[allocateSubject, setAllocateSubject] =useState([])
    const[allocatedClassroom, setAllocateClassroom] =useState([])

    const[id, setId] =useState(0)
    const[selectedStudent, setSelectedStudent] =useState("")
    
    const [name, setName] = useState("")
    const [contactPerson, setContactPerson] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [age, setAge] = useState(0)
    const [classId, setClassId] = useState("")
    const [classRoom, setClassRoom] = useState("")

    const [teacherSubject, setTeacherSubject] = useState([])

    // //get data
    useEffect(() => {
        try {
            axios.get(teacherURL)
            .then((response) => {
                setTeachers(response.data)
            })
        } catch (error) {
        console.log(error)
        }
    }, id)

    useEffect(() => {
        try {
            axios.get(subjectURL)
            .then((response) => {
                setSubjects(response.data)
            })
        } catch (error) {
        console.log(error)
        }
    }, id)

    useEffect(() => {
        try {
            axios.get(classURL)
            .then((response) => {
                setClassrooms(response.data)
            })
        } catch (error) {
        console.log(error)
        }
    }, id)

    const setStudentDetails = (e) => {
        try {
            setSelectedStudent(e.target.value)
            data.map(st => {
                if(st.student_id == parseInt(e.target.value)){
                    setId(st.student_id)
                    setName(st.first_name + " " + st.last_name)
                    setContactNo(st.contact_no)
                    setContactPerson(st.contact_person)
                    setEmail(st.email)
                    setDob(st.date_of_birth)
                    setClassId(st.classroom_id)   
                    setClassRoom(classrooms.find(cl=>cl.classroom_id == st.classroom_id).classroom_name)
                }

                axios.get(StudentURL+"/"+e.target.value)
                .then((response) => {
                    setTeacherSubject(response.data)
                })
            });
        } catch (error) {
            
        }
    }


  return (
    <div className='main-container w-100 d-flex flex-column align-items-center justify-content-center'>
        <div className="header">Student Details Report</div>
        <div className="detail-wrapper w-100 p-5 d-flex flex-column align-items-center justify-content-center gap-5">
            <div className="details w-100">
                <fieldset className="border p-2 w-100">
                    <legend>Student Details</legend>
                    <Form className="w-100 d-flex align-items-center justify-content-around flex-wrap">
                        <FormGroup className='box' row>
                            <Label for="exampleEmail" sm={3}>Student</Label>
                            <Col sm={9}>
                                <Input id="exampleSelect" name="select" type="select" onChange={(e)=>{setStudentDetails(e)}}>
                                    <option value="">--select--</option>
                                    {
                                        data.map(ls => (
                                            <option value={ls.student_id}>{ls.first_name + " " + ls.last_name}</option>
                                            ))
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup  className='box' row>
                            <Label for="classroom"sm={3}>Classroom</Label>
                            <Col sm={9}><Input id="classroom" name="classroom" type="text" readOnly  value={classRoom}/></Col>
                        </FormGroup>
                        <FormGroup  className='box' row>
                            <Label for="contactPerson"sm={3}>Contact Person</Label>
                            <Col sm={9}><Input id="contactPerson" name="contactPerson" type="text" readOnly  value={contactPerson}/></Col>
                        </FormGroup>
                        <FormGroup  className='box' row>
                            <Label for="email"sm={3}>Email address</Label>
                            <Col sm={9}><Input id="email" name="email" type="text" readOnly  value={email}/></Col>
                        </FormGroup>
                        <FormGroup  className='box' row>
                            <Label for="contactNo"sm={3}>Contact No</Label>
                            <Col sm={9}><Input id="contactNo" name="contactNo" type="text" readOnly  value={contactNo}/></Col>
                        </FormGroup>
                        <FormGroup  className='box' row>
                            <Label for="dob"sm={3}>Date Of Birth</Label>
                            <Col sm={9}><Input id="dob" name="dob" type="dob" readOnly  value={dob}/></Col>
                        </FormGroup>
                    </Form>
                </fieldset>
            </div>
            <div className="details w-100">
                <fieldset className="border p-3 w-100">
                    <legend>Teacher & Subject Details</legend>
                    <Table bordered hover responsive striped className='w-80'>
                        <thead color='dark'>
                        <tr>
                            <th>Subjects</th>
                            <th>Teachers</th>
                        </tr>
                        </thead>
                        <tbody id='tablebody'>
                        { teacherSubject.length ===0 ? ("No allocation yet") :(
                            teacherSubject.map(cls => (
                                <tr>
                                    <td>{subjects.find(alo=>alo.subject_id === cls.subject_id).subject_name}</td>
                                    <td>{teachers.find(alo=>alo.teacher_id === cls.teacher_id).first_name}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </Table>
                </fieldset>
            </div>
        </div>     
    </div>
  )
}

export default StudentDetailReport