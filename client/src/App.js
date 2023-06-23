import Student from './Pages/Student.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.sass'
import NavBar from './Components/NavBar.jsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import Teacher from './Pages/Teacher.jsx';
import ClassRoom from './Pages/ClassRoom.jsx';
import Subject from './Pages/Subject.jsx';
import AllocateSubject from './Pages/AllocateSubject.jsx';
import AllocateClass from './Pages/AllocateClass.jsx';
import StudentDetailReport from './Pages/StudentDetailReport.jsx';

function App() {

  return (
    <div>
      <BrowserRouter>      
        <NavBar/>          
        <Routes>
          <Route path='/' element={<Student/>}/>
          <Route path='/teacher' element={<Teacher/>}/>
          <Route path='/classroom' element={<ClassRoom/>}/>
          <Route path='/subject' element={<Subject/>}/>
          <Route path='/AllocateSubjects' element={<AllocateSubject/>}/>
          <Route path='/AllocateClassRooms' element={<AllocateClass/>}/>
          <Route path='/studentReport' element={<StudentDetailReport/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
