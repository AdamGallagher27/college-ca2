
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar';

import CourseIndex from './pages/courses/Index'
import CourseShow from './pages/courses/Show'
import CourseCreate from './pages/courses/Create'
import CourseEdit from './pages/courses/Edit'

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
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
