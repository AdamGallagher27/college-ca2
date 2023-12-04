import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../App'

const NavBar = () => {

  const [isAuthenticated, onAuthenticated] = useContext(Context)
  
  const handleClick = () => {
    onAuthenticated(false)
  }

  return (
    <div>
      <Link to='/'>Home</Link>
      {isAuthenticated ? <button onClick={handleClick}>Log Out</button> : ''}
    </div>
  )
}

export default NavBar