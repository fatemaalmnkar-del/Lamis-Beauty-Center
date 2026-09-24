import { Routes,Route,Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Services from './pages/Services'
import Register from './pages/Register'
import Login from './pages/Login'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/authSlice";


function App() {

 const user = useSelector((state) => state.auth.user);
 const dispatch = useDispatch();
 const handleLogout = () => {
  dispatch(logout());
};

  return (
    <>
    <div className='app'>
      <nav className='nav-links'>
        <div className='brand'>
          <img src='/lamis-logo.png' alt='lamis-logo' className='brand-logo'/>

        </div>
    
       <ul>
          <li>
            <Link to="/">Startseite</Link>
          </li>
          <li>
            <Link to="/services">Behandlungen</Link>
          </li>
          <li>
            <Link to="">vorher/nachher</Link>
          </li>
          <li>
            <Link to="">kontakt</Link>
          </li>
           
          {!user && (
            <>
              <li>
                <Link to="/login">Anmelden</Link>
              </li>
              <li>
                <Link to="/register">Registrieren</Link>
              </li>
            </>
          )}
          { user && user.role==="user" && (
            <>
              <li>
                <Link to="/profile">Mein Profil</Link>

              </li>
              <li>
                <Link to="/booking">Meine Termine</Link>
              </li>
            </>
          )}
         { user && user.role === "admin" && (
          <li>
            <Link to="/admin">Admin-Bereich</Link>
          </li>
           )}
          {user && (
          <li>
            <button onClick={handleLogout} className='logout-button'>Abmelden</button>
          </li>
          )}
        
        </ul>
      </nav>


      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/booking' element={<Booking/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
      </Routes>

    </div>

    </>
  )
}

export default App
