import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Navbar component with proper styling
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Effect to check login status from localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          setIsLoggedIn(true);
          setUserName(parsedUserInfo.name || parsedUserInfo.email);
        } catch (e) {
          console.error("Failed to parse userInfo from localStorage", e);
          setIsLoggedIn(false);
          setUserName("");
          localStorage.removeItem('userInfo');
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserName("");
    navigate('/');
  };

  return (
    <header className="header rs-nav" style={{ 
      background: '#1e1e1e !important', 
      backgroundColor: '#1e1e1e !important',
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      height: '70px'
    }}>
      {/* Main Navbar */}
              <div className="sticky-header navbar-expand-lg" style={{ background: '#1e1e1e !important' }}>
          <div className="menu-bar clearfix" style={{ background: '#1e1e1e !important' }}>
                        <div className="container clearfix" style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '70px',
              background: '#1e1e1e !important'
            }}>
              {/* Header Logo */}
              <div className="menu-logo">
                <Link to="/"><img src="assets/images/logo-white.png" alt="Logo" /></Link>
              </div>
              {/* Mobile Nav Button */}
              <button className="navbar-toggler collapsed menuicon justify-content-end" type="button">
                <span></span>
                <span></span>
                <span></span>
              </button>
              {/* Navigation Menu - Left Side */}
              <nav className="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
                <ul className="nav navbar-nav" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none' }}>
                  <li style={{ margin: '0 8px' }}><Link to="/courses" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>COURSES</Link></li>
                  <li style={{ margin: '0 8px' }}><Link to="/blog" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>BLOG</Link></li>
                  <li style={{ margin: '0 8px' }}><Link to="/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>ABOUT US</Link></li>
                  <li style={{ margin: '0 8px' }}><Link to="/events" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>EVENTS</Link></li>
                  <li style={{ margin: '0 8px' }}><Link to="/faq" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>FAQ</Link></li>
                  <li style={{ margin: '0 8px' }}><Link to="/cart" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>CART</Link></li>
                </ul>
              </nav>
              {/* Login/Register Links - Right Side */}
              <div className="auth-links" style={{ display: 'flex', alignItems: 'center' }}>
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', margin: '0 8px' }}>Hi, {userName}</Link>
                    <Link to="/" onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', margin: '0 8px' }}>Logout</Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', margin: '0 8px' }}>LOGIN</Link>
                    <Link to="/register" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', margin: '0 8px' }}>REGISTER</Link>
                  </>
                )}
                {/* Search Icon */}
                <button id="quik-search-btn" type="button" className="btn-link" style={{ color: '#fff', marginLeft: '15px' }}><i className="fa fa-search"></i></button>
              </div>
            {/* Search Box */}
            <div className="nav-search-bar">
              <form action="#">
                <input name="search" type="text" className="form-control" placeholder="Type to search" />
                <span><i className="ti-search"></i></span>
              </form>
              <span id="search-remove"><i className="ti-close"></i></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
