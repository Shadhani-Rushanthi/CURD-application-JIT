import React from 'react'
import './allocateStyles.sass'
import {FormGroup, Label, Input, Form, Col, Button, Table, Modal, ModalBody, ModalFooter} from 'reactstrap'
import { useState } from 'react'
import UseFetch from '../Hooks/UseFetch'
import {variables} from '../variables.js'
import axios from 'axios'
import { useEffect } from 'react'

const AllocateSubject = () => {

    let teacherURL = variables.API_URL + 'Teacher'
    let subjectURL = variables.API_URL + 'Subject'
    let allocateURL = variables.API_URL + 'Allocate'

    var {data, loading, error} = UseFetch(teacherURL);
    
    const[teachers, setTeachers] =useState([])
    const[subjects, setSubjects] =useState([])
    const[allAllocated, setAllAllocated] =useState([])
    const[allocatedSubjects, setAllocatedSubjects] =useState([])

    const[id, setId] =useState(0)
    const[selectedTeacher, setSelectedTeacher] =useState("")
    const[selectedSubject, setSelectedSubject] =useState("")
    const[isdelete, setIsDelete] = useState(false)
    const[message, setMessage] = useState("")

    
    const [open, setOpen] = useState(false);
    const [focusAfterClose, setFocusAfterClose] = useState(true);

    const toggle = () => setOpen(!open);

    const saveTeacher = () => {
        try {            
            axios.get(subjectURL)
            .then((response) => {
              setSubjects(response.data)
            });

            axios.get(allocateURL+"/"+selectedTeacher)
            .then((response) => {
              setAllocatedSubjects(response.data)
            });
        } catch (error) {
            
        }
    }

    const allocateSubject = () => {
        try {
            let available=false;
            allocatedSubjects.map(alo => {
                if(alo.teacher_id === parseInt(selectedTeacher) && alo.subject_id == parseInt(selectedSubject)){
                    available=true;
                }
            })
            if(!available){
                let al = {
                    teacherId: selectedTeacher,
                    subjectId: selectedSubject
                }
                axios.post(allocateURL, al)
                .then((response) => {
                    if(response.data == "saved successfully"){
                        setMessage("Subject Allocated Successfuly. refresh the page to view new allocations")
                    }else{
                        setMessage("Something went wrong, please try again")
                    }
                    toggle()
                })
            }else{
                setMessage("This subject is already allocated");
                toggle()
            }
        } catch (error) {
            
        }
    }

    const deallocateSubject = (e) => {
        try {
            setId(e.target.parentNode.id)
            setIsDelete(true)
            setMessage("Do you want to remove this subject?")
            toggle()
        } catch (error) {
            
        }
    }

    const deleteClass = () => {
        try{
            let index = allocatedSubjects.findIndex(alo=> alo.allocate_id === parseInt(id))
            allocatedSubjects.splice(index, 1);

            axios.delete(allocateURL+"/"+id)
            .then((response) => {
                if(response.data == "deleted successfully"){
                    setMessage("Subject Deallocaetd Successfuly")
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
        <div className="header">Allocate Subjects</div>
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
                            <Button onClick={saveTeacher} color='secondary' title='Click to alloate / deallocate subjects to the teacher'>Save</Button>
                        </Col>
                    </FormGroup>
                </fieldset>
            </div>
            <div className="details w-100">
                <fieldset class="border p-3 w-100">
                    <legend>Allocated Subjects</legend>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={1}>Subject</Label>
                        <Col sm={3}>
                            <Input id="exampleSelect" name="select" type="select" value={selectedSubject} onChange={(e)=>{setSelectedSubject(e.target.value)}}>
                                <option value="">--select--</option>
                                {
                                    subjects.map(ls => (
                                    <option value={ls.subject_id}>{ls.subject_name}</option>
                                    ))
                                }
                            </Input>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={allocateSubject} color='secondary'>Allocate</Button>
                        </Col>
                    </FormGroup>
                    {/* <span>{message}</span> */}
                    <Table bordered hover responsive striped className='w-80'>
                        <thead color='dark'>
                        <tr>
                            <th colSpan={4}>Subjects</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody id='tablebody'>
                        { allocatedSubjects.length ===0 ? ("No allocation yet") :(
                            allocatedSubjects.map(cls => (
                                <tr>
                                    <td colSpan={4}>{subjects.find(alo=>alo.subject_id === cls.subject_id).subject_name}</td>
                                    <td id={cls.allocate_id}>
                                        <Button onClick={(e)=>{deallocateSubject(e)}} color='secondary' title='Click to remove the allocated subject from the teacher'>Deallocate</Button>
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

export default AllocateSubject