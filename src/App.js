
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar';

import CourseIndex from './pages/courses/Index'
import CourseShow from './pages/courses/Show'
import CourseCreate from './pages/courses/Create'
import CourseEdit from './pages/courses/Edit'

import LecturerIndex from './pages/lecturers/Index'
import LecturerShow from './pages/lecturers/Show'
import LecturerCreate from './pages/lecturers/Create'
import LecturerEdit from './pages/lecturers/Edit'

import EnrolmentIndex from './pages/enrolments/Index'
import EnrolmentShow from './pages/enrolments/Show'
import EnrolmentCreate from './pages/enrolments/Create'
import EnrolmentEdit from './pages/enrolments/Edit'

import { useEffect, useState } from 'react';

export const Context = React.createContext()


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('AUTH_TOKEN')) {
      setIsAuthenticated(true)
    }
  }, [])

  const onAuthenticated = (auth, token = '') => {
    setIsAuthenticated(auth)

    if (auth) {
      localStorage.setItem('AUTH_TOKEN', token)
    }
    else if (!auth) {
      localStorage.removeItem('AUTH_TOKEN')
    }
  }

  return (
    <div className="App">
      <Context.Provider value={[isAuthenticated, onAuthenticated]}>
        <Router>
          { isAuthenticated ? <NavBar /> : ''}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<CourseIndex />} />
            <Route path='/courses/show/:courseID' element={<CourseShow />} />
            <Route path='/courses/create' element={<CourseCreate />} />
            <Route path='/courses/edit/:courseID' element={<CourseEdit />} />
            <Route path='/lecturers' element={<LecturerIndex />} />
            <Route path='/lecturers/:lecturerID' element={<LecturerShow />} />
            <Route path='/lecturers/create' element={<LecturerCreate />} />
            <Route path='/lecturers/edit/:lecturerID' element={<LecturerEdit />} />
            <Route path='/enrolments' element={<EnrolmentIndex />} />
            <Route path='/enrolments/:enrolmentID' element={<EnrolmentShow />} />
            <Route path='/enrolments/create' element={<EnrolmentCreate />} />
            <Route path='/enrolments/edit/:enrolmentID' element={<EnrolmentEdit />}/>
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
