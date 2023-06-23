import React from 'react'
import './style.sass'
import {NavbarBrand, Form, FormGroup, Label, Input, Button, Table, Modal, ModalBody, ModalFooter} from 'reactstrap'
import home from '../images/home.png'
import cube from '../images/cube.png'
import down from '../images/down.png'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import UseFetch from '../Hooks/UseFetch'
import { lazy } from 'react'
import { variables } from '../variables'

const Student = () => {
  
  const studetURL = variables.API_URL+'Student';

  const {data, loading, error} = UseFetch("https://localhost:44392/api/ClassRoom");

  const [students, setStudents] = useState([])
  const [id, setID] = useState(0)
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [age, setAge] = useState(0)
  const [classId, setClassId] = useState("")
  const [message, setMessage] = useState("")
  const [errMessage, setErrMessage] = useState("")
  
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);
  const [isdelete, setIsDelete] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  //get data
  useEffect(() => {
    try {
      axios.get("https://localhost:44392/api/Student")
      .then((response) => {
        setStudents(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, )

  const toggle = () => setOpen(!open);

  // save data
  const saveorUpdate = () => {
    try {
      if(fname != "" && lname != "" && contactPerson != "" && contactNo != undefined && email != "" && dob != undefined && age != undefined && classId != ""){
        const student = {
          studentId:id,
          firstName: fname,
          lastName: lname,
          contactPerson: contactPerson,
          contactNo: contactNo,
          email: email,
          dataOfBirth:dob,
          age: 23,
          classroomId: classId
        }

        if(isUpdate){
          axios.put(studetURL,student)
          .then((response) =>{
              if(response.data == "Student details updated successfully"){
                resetData()
                setIsUpdate(false)
                setMessage("Student details updated successfully")
              }else{
                setMessage("Something went wrong please try again.")
              }
              toggle()
          }).catch((error)=>{
            console.log(error)
          })
        }else{
          axios.post(studetURL,student)
          .then((response) =>{
              if(response.data == "Student saved successfully"){
                resetData()
                setMessage("Student saved sucessfully.")
              }else{
                setMessage("Something went wrong please try again.")
              }
              toggle()
          }).catch((error)=>{
            console.log(error)
          })
        }
      }else{
        setErrMessage("Please fill all the details.")
      }
    } catch (error) {
      
    }
  }

  //ask to confirm the deletion
  const clickDelete = () => {
    try {   
      setMessage("Do you want to delete this student details"); 
      setIsDelete(true) 
      toggle()
    } catch (error) {
      
    }
  }
  //delete data
  const deleteStudent = () => {
    try {
      setIsDelete(false) 
      axios.delete(studetURL+'/'+id)
      .then((response) =>{
          if(response.data == "Student deleted successfully"){
            setMessage("Student details deleted successfully.")
            resetData()
          }else{
            setMessage("Something went wrong please try again.")
          }
      }).catch((error)=>{
          console.log(error)
      })
    } catch (error) {
      
    }
  }

  //reset input fields
  const resetData = () => {
    setID(0)
    setFname("")
    setLname("")
    setContactPerson("")
    setContactNo("")
    setEmail("")
    setDob("")
    setAge("")
    setClassId("")
    setIsDelete(false)
    setIsUpdate(false)
  }

  //calculate the age
  const calAge = (e) => {
    try {
      setDob(e.target.value)
      let bdate = new Date(dob)

      var diff_ms = Date.now() - bdate.getTime();
      var age_dt = new Date(diff_ms); 
    
      setAge(Math.abs(age_dt.getUTCFullYear() - 1970));
    } catch (error) {
      
    }
  }

  //select data from the table and assign to input fields
  const selectRowData = (e) => {
    try {
      setID(e.parentNode.id);
      setIsUpdate(true)
      students.map(std=>{
        if(std.student_id == id){
          setFname(std.first_name)
          setLname(std.last_name)
          setContactPerson(std.contact_person)
          setContactNo(std.contact_no)
          setEmail(std.email)
          setDob(new Date(std.date_of_birth))
          setAge(std.age)
          setClassId(std.classroom_id)
        }
      })
    } catch (error) {
      
    }
  }

  return (
    <div className="main-container">
      <div className="header-wrapper d-flex justify-content-start align-items-center student">
        <NavbarBrand href="/" className="home"><img src={home} alt="" /></NavbarBrand>
        Student
      </div>

      <div className="details-wrapper w-100 m-0 d-flex flex-column align-items-center justify-content-center">
        <div className="info-wrapper w-100 d-flex flex-column align-items-center justify-content-center">
          <div className="info-heading p-2 w-100 d-flex justify-content-between align-items-center student">
            <div className='d-flex justify-content-between align-items-center'>
              <img src={cube} alt="" className='cube m-1'/>
              <div>Student Details</div>
            </div>
            <div>
              <img src={down} alt="" className='down' />
            </div>
          </div>
          <div className="info p-3 w-100 d-flex flex-column justify-content-center align-items-center">
            <Form className='w-100 d-flex gap-1 flex-wrap justify-content-around align-items-center'>
              <FormGroup className='box'>
                <Label for="fname">First Name</Label>
                <Input id="fname" name="fname" type="text" required value={fname} onChange={(e)=>{setFname(e.target.value)}}/>
              </FormGroup>
              <FormGroup className='box'>
                <Label for="lname">Last Name</Label>
                <Input id="lname" name="lname" type="text" required value={lname} onChange={(e)=>{setLname(e.target.value)}}/>
              </FormGroup>
              <FormGroup className='box'>
                <Label for="contactPerson">Contact Person</Label>
                <Input id="contactPerson" name="contactPerson" type="text" value={contactPerson} onChange={(e)=>{setContactPerson(e.target.value)}}/>
              </FormGroup>
              <FormGroup className='box'>
                <Label for="contactNo">Contact No</Label>
                <Input id="contactNo" name="contactNo" type="tel" maxLength={10} value={contactNo} onChange={(e)=>{setContactNo(e.target.value)}}/>
              </FormGroup>
              <FormGroup className='box'>
                <Label for="email">Email</Label>
                <Input id="email" name="email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              </FormGroup>              
              <FormGroup className='box'>
                <Label for="dob">Date Of Birth</Label>
                <Input id="dob" name="dob" type="date" value={dob} onChange={(e)=>{calAge(e)}}/>
              </FormGroup>                            
              <FormGroup className='box'>
                <Label for="dob">Age</Label>
                <Input id="dob" name="dob" type="text" value={age} disabled onChange={(e)=>{setAge(e.target.value)}}/>
              </FormGroup>
              <FormGroup className='box'>
                <Label for="exampleSelect">Select</Label>
                <Input id="exampleSelect" name="select" type="select" value={classId} onChange={(e)=>{setClassId(e.target.value)}}>
                  <option value="">--select--</option>
                  {
                    data.map(ls => (
                      <option value={ls.classroom_id}>{ls.classroom_name}</option>
                    ))
                  }
                </Input>
              </FormGroup>
            </Form>
            <span className='error'>{errMessage}</span>
            <div className='p-3 w-100 d-flex justify-content-end align-items-center'>
              <Button onClick={saveorUpdate} color='success'>{isUpdate ? 'Update' : 'Save'}</Button>
              <Button onClick={clickDelete} color='danger'>Delete</Button>
              <Button onClick={resetData} color='warning'>Reset</Button>
            </div>
          </div>
        </div>

        <div className="info-wrapper w-100 d-flex flex-column align-items-center justify-content-center">
          <div className="info-heading p-2 w-100 d-flex justify-content-between align-items-center student">
            <div className='d-flex justify-content-between align-items-center'>
              <img src={cube} alt="" className='cube m-1'/>
              <div>Existing Students</div>
            </div>
            <div>
              <img src={down} alt="" className='down' />
            </div>
          </div>
          <div className="info  p-3 w-100">
          <Table bordered hover responsive striped>
          <thead color='dark'>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date Of Birth</th>
              <th>Email</th>
              <th>Contact Person</th>
              <th>Contact No</th>
              <th>Class Room</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map(std => (
                  <tr id={std.student_id} onClick={(e)=>{selectRowData(e.target)}} title='double click to update or delete data'>
                    <td>{std.first_name}</td>
                    <td>{std.last_name}</td>
                    <td>{std.age}</td>
                    <td>{std.date_of_birth}</td>
                    <td>{std.email}</td>
                    <td>{std.contact_person}</td>
                    <td>{std.contact_no}</td>
                    <td>{std.classroom_id}</td>
                  </tr>
                )
              )
            }
          </tbody>
        </Table>
          </div>
        </div>
      </div>

      <Modal returnFocusAfterClose={focusAfterClose} isOpen={open}>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          {isdelete && <Button color="danger" onClick={deleteStudent}>Confirm</Button>}
          <Button color="primary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Student