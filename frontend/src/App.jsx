import { useState } from "react";
import { Routes,Route,Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram,FaEnvelope,FaPhoneAlt,FaMapMarkerAlt } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import './App.css'
import Home from './pages/Home'
import Services from './pages/Services'
import Register from './pages/Register'
import Login from './pages/Login'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import Kontakt from './pages/Kontakt';
import Gallery from './pages/Gallery'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/authSlice"
import Reviews from "./pages/Reviews";
import About from './pages/About';

function App() {

 const user = useSelector((state) => state.auth.user);

 const [menuOpen, setMenuOpen] = useState(false);
 const dispatch = useDispatch();
 const handleLogout = () => {
  dispatch(logout());
  setMenuOpen(false);
};

  return (
    <>
    <div className='app'>
      <nav className='nav-links'>
        <div className='brand'>
          <img src='/lamis-logo.png' alt='lamis-logo' className='brand-logo'/>

        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          ☰
        </button>
    
       <ul className={menuOpen ? "nav-menu active" : "nav-menu"}  onClick={() => setMenuOpen(false)}>
          <li>
            <Link to="/">Startseite</Link>
          </li>
          <li>
            <Link to="/about">Über Uns</Link>
          </li>
          <li>
            <Link to="/services">Behandlungen</Link>
          </li>
          <li>
            <Link to="/gallery">vorher/nachher</Link>
          </li>
          <li>
            <Link to="/Kontakt">kontakt</Link>
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
            <>
              <li>
                <Link to="/admin">Admin-Bereich</Link>
              </li>

              <li>
                <Link to="/booking">Termine</Link>
              </li>
            </>
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
        <Route path='/Kontakt'element={<Kontakt/>}/>
        <Route path='/gallery' element={<Gallery/>} />
        <Route path='/about' element={<About/>} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>


      <footer className='footer'>
        <div className='footer-content'>
           <div className='footer-brand'>
             <img src='/lamis-logo.png' alt='lamis-logo' className='footer-brand-logo'/>
             <p>  Schönheit, Pflege und Wohlbefinden in einer angenehmen Atmosphäre.</p>
           </div>
            <div className='footer-links'>
               <h3>Schnelllinks</h3>
               <Link to="/">Startseite</Link>
               <Link to="/services">Behandlungen</Link>
               <Link to="/booking">Termin buchen</Link>
            </div>
            <div className='footer-kontakt'>
              <h3>Kontakt</h3>
              <p> <a href="mailto:lamis1999.01.25@gmail.com"> <FaEnvelope/><span>E-Mail</span></a></p>
             
              <p> <a href="tel:+491629342752"> <FaPhoneAlt/><span>+491629342752</span></a></p>
              <p><span className='kontakt-adresse'> <FaMapMarkerAlt />Pirmasenser Str. 24 - 26, 67655 Kaiserslautern</span></p>
            </div>
            <div className="footer-zeiten">
              <h3>Öffnungszeiten</h3>
              <p>Montag – Samstag: 10:00 – 18:00</p>
              <p>Sonntag: Geschlossen</p>
            </div>
           
            <div className='footer-social'>
              <h3>Folgen Sie uns</h3>
              <div className='social-links'>
                <a href="https://www.facebook.com/share/1Gxyu2qdPy/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                   <span>Facebook</span>
                </a>
                <a href="https://www.instagram.com/lamis__akademie?stkn=cmJrM2RjYjllbGdx&utm_source=qr" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                   <span>Instagram</span>
                </a>
                <a href="https://www.tiktok.com/@lamisakademie8?_r=1&_t=ZN-9AA8Z7TYJfy" target="_blank" rel="noopener noreferrer">
                  <FaTiktok />
                   <span>TikTok</span>
                </a>
              </div>
              
            </div>
        </div>
        <div className='footer-bottom'>
                <p>&copy; {new Date().getFullYear()} Lamis Beauty Center. Alle Rechte vorbehalten.</p>
                <p>Website entwickelt von Fatema Almnkar</p>
              </div>
      </footer>

    </div>

    </>
  )
}

export default App
