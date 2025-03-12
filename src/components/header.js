import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdOutlineCopyright, MdLogout } from "react-icons/md";
import { TbCircleLetterE } from "react-icons/tb";
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'https://www.estrotech.in/';
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>

      {/* Header */}
      <header className='header'>
        <div className='navbar'>
          <div className="navbar-left">
            <button className="toggle-button" onClick={toggleSidebar}><FaBars /></button>
            <span className="project-name">Estro Tech</span>
          </div>
          <div className="navbar-right">
            <TbCircleLetterE className="profile-icon" />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="project-name">Estro Tech</span>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
          <li><Link to="/devices" onClick={toggleSidebar}>Devices</Link></li>
        </ul>
        <div className="logout-container">
          <span className="logout-link" onClick={handleLogout}><MdLogout className="logout-icon" /> Logout</span>
        </div>
        <footer className="sidebar-footer">
          <MdOutlineCopyright style={{ verticalAlign: 'middle', marginBottom: '3px', marginRight: '2px' }} />Estro Tech Robotics and Innovations Pvt. Ltd.
        </footer>
      </div>
    </>
  );
}

export default Header;