import '../Styles/components.css';
import React from 'react';
import {
  // FaBell,
  // FaCog,
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { useData } from '../Context/Contexts';
import { Link, useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { currentUserData, logoutAccount, loadingState } = useData();
  const handleSignOut = async () => {
    try {
      await logoutAccount();
      if (loadingState) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      {currentUserData === null ? (
        <MoonLoader color={'#f5f5f5'} />
      ) : (
        <div className="user-info">
          <p className="user-logo">{currentUserData?.userLogo}</p>
          <div className="user-info-name">
            <h2>{`${currentUserData?.firstName}`}</h2>
            <h4>{currentUserData?.userName}</h4>
          </div>
        </div>
      )}
      <ul className="sidebar-list">
        <Link to="/home">
          <li className="sidebar-item normal">
            <FaHome className="sidebar-icon" />
            <span className="sidebar-item-text">Home</span>
          </li>
        </Link>
        <Link to="/profile">
          <li className="sidebar-item normal">
            <FaUser className="sidebar-icon" />
            <span className="sidebar-item-text">Profile</span>
          </li>
        </Link>
        {/* <Link to="/notifications">
          <li className="sidebar-item normal">
            <FaBell className="sidebar-icon" />
            <span className="sidebar-item-text">Notifications</span>
          </li>
        </Link> */}
        {/* <Link to="/settings">
          <li className="sidebar-item normal">
            <FaCog className="sidebar-icon" />
            <span className="sidebar-item-text">Settings</span>
          </li>
        </Link> */}
        <Link to="/new">
          <li className="sidebar-item new-button primary">
            <FaPlusCircle className="sidebar-icon" />
            <span className="sidebar-item-text">New Post</span>
          </li>
        </Link>
        <li
          className="sidebar-item new-button normal signoutLink"
          onClick={handleSignOut}
        >
          <FaSignOutAlt className="sidebar-icon" />
          <span className="sidebar-item-text">Sign Out</span>
        </li>
      </ul>
      <button className="signout-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};
