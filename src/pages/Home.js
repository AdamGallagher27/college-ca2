import React, { useState, useContext } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useNavigate } from 'react-router-dom'
import { Context } from '../App'

const Home = () => {
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [showRegister, setShowRegister] = useState(false)
  const navigate = useNavigate()

  const switchView = () => {
    setShowRegister(!showRegister)
  }
  
  return (
    <div className="hero">
      {isAuthenticated ? navigate('/courses') : ''}
      <div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-200 mt-96">
          {showRegister ? <RegisterForm switchView={switchView} /> : <LoginForm switchView={switchView} />}
        </div>
      </div>
    </div>
  )
}

export default Home