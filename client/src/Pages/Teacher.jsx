import React from 'react'
import './style.sass'
import {NavbarBrand, Form, FormGroup, Label, Input, Button, Table, Modal, ModalBody, ModalFooter} from 'reactstrap'
import home from '../images/home.png'
import cube from '../images/cube.png'
import down from '../images/down.png'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { variables } from '../variables'

const Teacher = () => {

  const teacherURL = variables.API_URL + 'Teacher';

  const [teachers, setTeachers] = useState([])
  const [id, setID] = useState(0)
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errMessage, setErrMessage] = useState("")
  
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);
  const [isdelete, setIsDelete] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  //get data
  useEffect(() => {
    try {
      axios.get(teacherURL)
      .then((response) => {
        setTeachers(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [teachers])

  const toggle = () => setOpen(!open);

  // save data
  const saveorUpdate = () => {
    try {
      if(fname != "" && lname != "" && contactNo != undefined && email != ""){
        const teacher = {
          teacherId: id,
          firstName: fname,
          lastName: lname,
          contactNo: contactNo,
          email: email,
        }
        if(isUpdate){
          axios.put(teacherURL,teacher)
          .then((response) =>{
              if(response.data == "Teacher details updated successfully"){
                resetData()
                setIsUpdate(false)
                setMessage("Teacher details updated successfully.")
              }else{
                setMessage("Something went wrong please try again.")
              }
              toggle()
          }).catch((error)=>{
            console.log(error)
          })
        }else{
          axios.post(teacherURL,teacher)
          .then((response) =>{
              if(response.data == "Teacher saved successfully"){
                resetData()
                setMessage("Teacher saved sucessfully.")
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
      setMessage("Do you want to delete this teacher details"); 
      setIsDelete(true) 
      toggle()
    } catch (error) {
      
    }
  }
  //delete data
  const deleteTeacher = () => {
    try {
      setIsDelete(false) 
      axios.delete(teacherURL+'/'+id)
      .then((response) =>{
          if(response.data == "Teacher deleted successfully"){
            setMessage("Teacher details deleted successfully.")
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
    setContactNo("")
    setEmail("")
    setIsDelete(false)
    setIsUpdate(false)
  }

 
  //select data from the table and assign to input fields
  const selectRowData = (e) => {
    try {
      setID(e.parentNode.id);
      setIsUpdate(true)
      teachers.map(th=>{
        if(th.teacher_id == id){
          setFname(th.first_name)
          setLname(th.last_name)
          setContactNo(th.contact_no)
          setEmail(th.email)
        }
      })
    } catch (error) {
      
    }
  }

  return (
    <div className="main-container">
      <div className="header-wrapper d-flex justify-content-start align-items-center teacher">
        <NavbarBrand href="/" className="home"><img src={home} alt="" /></NavbarBrand>
        Teacher
      </div>

      <div className="details-wrapper w-100 m-0 d-flex flex-column align-items-center justify-content-center">
        <div className="info-wrapper w-100 d-flex flex-column align-items-center justify-content-center">
          <div className="info-heading p-2 w-100 d-flex justify-content-between align-items-center teacher">
            <div className='d-flex justify-content-between align-items-center'>
              <img src={cube} alt="" className='cube m-1'/>
              <div>Teacher Details</div>
            </div>
            <div>
              <img src={down} alt="" className='down' />
            </div>
          </div>
          <div className="info p-3 w-100">
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
                <Label for="contactNo">Contact No</Label>
                <Input id="contactNo" name="contactNo" type="tel" maxLength={10} value={contactNo} onChange={(e)=>{setContactNo(e.target.value)}}/>
              </FormGroup>
              <FormGroup className='box'>
                <Label for="email">Email</Label>
                <Input id="email" name="email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              </FormGroup>
            </Form>
            <span className='error'>{errMessage}</span>
            <div className='p-3 d-flex justify-content-end align-items-center'>
              <Button onClick={saveorUpdate} color='success'>{isUpdate ? 'Update' : 'Save'}</Button>
              <Button onClick={clickDelete} color='danger'>Delete</Button>
              <Button onClick={resetData} color='warning'>Reset</Button>
            </div>
          </div>
        </div>

        <div className="info-wrapper w-100 d-flex flex-column align-items-center justify-content-center">
          <div className="info-heading p-2 w-100 d-flex justify-content-between align-items-center teacher">
            <div className='d-flex justify-content-between align-items-center'>
              <img src={cube} alt="" className='cube m-1'/>
              <div>Existing Teachers</div>
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
              <th>Email</th>
              <th>Contact No</th>
            </tr>
          </thead>
          <tbody>
            {
              teachers.map(std => (
                  <tr id={std.teacher_id} onClick={(e)=>{selectRowData(e.target)}} title='double click to update or delete data'>
                    <td>{std.first_name}</td>
                    <td>{std.last_name}</td>
                    <td>{std.email}</td>
                    <td>{std.contact_no}</td>
                  </tr>
              ))
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
          {isdelete && <Button color="danger" onClick={deleteTeacher}>Confirm</Button>}
          <Button color="primary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Teacher