import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../App'

const NavBar = () => {

  let logoutButton = ''
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const navigate = useNavigate()

  const handleClick = () => {
    onAuthenticated(false)
    navigate('/')
  }

  return (
    // <div>
    //   <Link to='/'>Home</Link>
    //   {isAuthenticated ? <button onClick={handleClick}>Log Out</button> : ''}
    // </div>
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='/courses'>Courses</Link></li>
            <li><Link to='/lecturers'>Lecturers</Link></li>
            <li><Link to='/enrolments'>Enrolments</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <p className="text-xl">CollegeDB</p>
      </div>
      <div className="navbar-end">
        <button onClick={handleClick} className="btn">Logout</button>
      </div>
    </div>
  )
}

export default NavBar