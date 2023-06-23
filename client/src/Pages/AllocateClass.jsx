import React from 'react'
import './allocateStyles.sass'
import {FormGroup, Label, Input, Form, Col, Button, Table, Modal, ModalBody, ModalFooter} from 'reactstrap'
import { useState } from 'react'
import UseFetch from '../Hooks/UseFetch'
import {variables} from '../variables.js'
import axios from 'axios'
import { useEffect } from 'react'

const AllocateClass = () => {

    let teacherURL = variables.API_URL + 'Teacher'
    let classURL = variables.API_URL + 'ClassRoom'
    let allocateURL = variables.API_URL + 'ClassAllocate'

    var {data, loading, error} = UseFetch(teacherURL);
    
    const[teachers, setTeachers] =useState([])
    const[classRooms, setClassRooms] =useState([])
    const[allAllocated, setAllAllocated] =useState([])
    const[allocatedClassrooms, setAllocatedClassrooms] =useState([])

    const[id, setId] =useState(0)
    const[selectedTeacher, setSelectedTeacher] =useState("")
    const[selectedClassroom, setSelectedClassroom] =useState("")
    const[isdelete, setIsDelete] = useState(false)
    const[message, setMessage] = useState("")

    
    const [open, setOpen] = useState(false);
    const [focusAfterClose, setFocusAfterClose] = useState(true);

    const toggle = () => setOpen(!open);

    const saveTeacher = () => {
        try {
            
            axios.get(classURL)
            .then((response) => {
              setClassRooms(response.data)
            });

            axios.get(allocateURL+"/"+selectedTeacher)
            .then((response) => {
              setAllocatedClassrooms(response.data)
            });
        } catch (error) {
            console.log(error)
        }
    }

    const allocateClasses = () => {
        try {
            let available=false;
            allocatedClassrooms.map(alo => {
                if(alo.teacher_id === parseInt(selectedTeacher) && alo.classroom_id == parseInt(selectedClassroom)){
                    available=true;
                }
            })
            if(!available){
                let al = {
                    teacherId: selectedTeacher,
                    classRoomId: selectedClassroom
                }
                axios.post(allocateURL, al)
                .then((response) => {
                    if(response.data == "saved successfully"){
                        setSelectedClassroom("")
                        setMessage("Class room Allocated Successfuly. refresh the page to view new allocations.")
                    }else{
                        setMessage("Something went wrong, please try again.")
                    }
                    toggle()
                })
            }else{
                setMessage("This class room is already allocated.");
                toggle()
            }
        } catch (error) {
            
        }
    }

    const deallocateClasss = (e) => {
        try {
            setId(e.target.parentNode.id)
            setIsDelete(true)
            setMessage("Do you want to remove this classroom?")
            toggle()
        } catch (error) {
            
        }
    }

    const deleteClass = () => {
        try{
            let index = allocatedClassrooms.findIndex(alo=> alo.allocate_id === parseInt(id))
            allocatedClassrooms.splice(index, 1);

            axios.delete(allocateURL+"/"+id)
            .then((response) => {
                if(response.data == "deleted successfully"){
                    setMessage("Class room Deallocaetd Successfuly")
                    setSelectedClassroom("")
                }else{
                    setMessage("Something went wrong, please try again")
                }
                toggle()
                setIsDelete(false)
            }); 
        }catch (error){
            
        }
    }

    return (
    <div className='main-container w-100 d-flex flex-column align-items-center justify-content-center'>
        <div className="header">Allocate Class Rooms</div>
        <div className="detail-wrapper w-100 p-5 d-flex flex-column align-items-center justify-content-center gap-5">
            <div className="details w-100">
                <fieldset class="border p-2 w-100">
                    <legend>Teacher Details</legend>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={1}>Teacher</Label>
                        <Col sm={3}>
                            <Input id="exampleSelect" name="select" type="select" value={selectedTeacher} onChange={(e)=>{setSelectedTeacher(e.target.value)}}>
                                <option value="">--select--</option>
                                {
                                    data.map(ls => (
                                        <option value={ls.teacher_id}>{ls.first_name + " " + ls.last_name}</option>
                                    ))
                                }
                            </Input>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={saveTeacher} color='secondary' title='Click to alloate / deallocate classrooms to the teacher'>Save</Button>
                        </Col>
                    </FormGroup>
                </fieldset>
            </div>
            <div className="details w-100">
                <fieldset class="border p-3 w-100">
                    <legend>Allocated Class Rooms</legend>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={1}>Classroom</Label>
                        <Col sm={3}>
                            <Input id="exampleSelect" name="select" type="select" value={selectedClassroom} onChange={(e)=>{setSelectedClassroom(e.target.value)}}>
                                <option value="">--select--</option>
                                {
                                    classRooms.map(ls => (
                                    <option value={ls.classroom_id}>{ls.classroom_name}</option>
                                    ))
                                }
                            </Input>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={allocateClasses} color='secondary'>Allocate</Button>
                        </Col>
                    </FormGroup>
                    {/* <span>{message}</span> */}
                    <Table bordered hover responsive striped className='w-80'>
                        <thead color='dark'>
                        <tr>
                            <th colSpan={4}>Classrooms</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody id='tablebody'>
                        { allocatedClassrooms.length ===0 ? ("No allocation yet") :(
                            allocatedClassrooms.map(cls => (
                                <tr>
                                    <td colSpan={4}>{classRooms.find(alo=>alo.classroom_id === cls.classroom_id).classroom_name}</td>
                                    <td id={cls.allocate_id}>
                                        <Button onClick={(e)=>{deallocateClasss(e)}} color='secondary' title='Click to remove the allocated classrooms from the teacher'>Deallocate</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </Table>
                </fieldset>
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

export default AllocateClass