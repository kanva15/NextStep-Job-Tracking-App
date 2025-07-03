// src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom'
import logo from '../assets/nextstep-logo.png'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const goHome = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <nav className="navbar navbar-light bg-light justify-content-between px-4">
      {/* Brand + logo */}
      <a
        href="/dashboard"
        className="navbar-brand d-flex align-items-center"
        onClick={goHome}
      >
        <img
          src={logo}
          alt="NextStep logo"
          width="120"
          height="120"
          className="d-inline-block align-top me-2"
        />
      </a>

      {/* Logout button */}
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}
