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
import UseFetch from '../Hooks/UseFetch'

const ClassRoom = () => {
  
  const classURL = variables.API_URL + "ClassRoom"

  const [classRooms, setClassRooms] = useState([])
  const [id, setID] = useState(0)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [errMessage, setErrMessage] = useState("")
  
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);
  const [isdelete, setIsDelete] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  //get data
  useEffect(() => {
    try {
      axios.get(classURL)
      .then((response) => {
        setClassRooms(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [classRooms])

  const toggle = () => setOpen(!open);

  // save data
  const saveorUpdate = () => {
    try {
      if(name != ""){
        const classroom = {
          classRoomId: id,
          className: name
        }

        if(isUpdate){
          axios.put(classURL,classroom)
          .then((response) =>{
              if(response.data == "ClassRoom details updated successfully"){
                resetData()
                setIsUpdate(false)
                setMessage("ClassRoom details updated successfully.")
              }else{
                setMessage("Something went wrong please try again.")
              }
              toggle()
          }).catch((error)=>{
            console.log(error)
          })
        }else{
          axios.post(classURL,classroom)
          .then((response) =>{
              if(response.data == "ClassRoom saved successfully"){
                resetData()
                setMessage("ClassRoom saved successfully.")
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
      setMessage("Do you want to delete this class room details"); 
      setIsDelete(true) 
      toggle()
    } catch (error) {
      
    }
  }
  //delete data
  const deleteClass = () => {
    try {
      setIsDelete(false) 
      axios.delete(classURL+'/'+id)
      .then((response) =>{
          if(response.data == "ClassRoom deleted successfully"){
            setMessage("ClassRoom deleted successfully.")
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
    setName("")
    setIsDelete(false)
    setIsUpdate(false)
  }

 
  //select data from the table and assign to input fields
  const selectRowData = (e) => {
    try {
      setID(e.parentNode.id);
      setIsUpdate(true)
      classRooms.map(th=>{
        if(th.classroom_id == id){
          setName(th.classroom_name)
        }
      })
    } catch (error) {
      
    }
  }

  return (
    <div className="main-container">
      <div className="header-wrapper d-flex justify-content-start align-items-center classroom">
        <NavbarBrand href="/" className="home"><img src={home} alt="" /></NavbarBrand>
        Class Room
      </div>

      <div className="details-wrapper w-100 m-0 d-flex flex-column align-items-center justify-content-center">
        <div className="info-wrapper w-100 d-flex flex-column align-items-center justify-content-center">
          <div className="info-heading p-2 w-100 d-flex justify-content-between align-items-center classroom">
            <div className='d-flex justify-content-between align-items-center'>
              <img src={cube} alt="" className='cube m-1'/>
              <div>Class Room Details</div>
            </div>
            <div>
              <img src={down} alt="" className='down' />
            </div>
          </div>
          <div className="info p-3 w-100">
            <Form className='w-100 d-flex gap-1 flex-wrap justify-content-around align-items-center'>
              <FormGroup className='box'>
                <Label for="name">Class Room Name</Label>
                <Input id="name" name="name" type="text" required  value={name} onChange={(e)=>{setName(e.target.value)}}/>
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
          <div className="info-heading p-2 w-100 d-flex justify-content-between align-items-center classroom">
            <div className='d-flex justify-content-between align-items-center'>
              <img src={cube} alt="" className='cube m-1'/>
              <div>Existing Class Rooms</div>
            </div>
            <div>
              <img src={down} alt="" className='down' />
            </div>
          </div>
          <div className="info  p-3 w-100">
          <Table bordered hover responsive striped>
            <thead color='dark'>
              <tr>
                <th>Class Room Name</th>
              </tr>
            </thead>
            <tbody>
              {
                classRooms.map(cls => (
                    <tr id={cls.classroom_id} onClick={(e)=>{selectRowData(e.target)}} title='double click to update or delete data'>
                      <td>{cls.classroom_name}</td>
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
          {isdelete && <Button color="danger" onClick={deleteClass}>Confirm</Button>}
          <Button color="primary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ClassRoom