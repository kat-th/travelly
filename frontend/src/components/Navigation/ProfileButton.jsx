import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from 'react-router-dom';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = e => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = e => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

    return (
        <div className="profile-button-container">
            <button onClick={toggleMenu} className="profile-button">
                <FaUserCircle size={32} style={{ color: '#7d7a85' }} />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div className="user-name">Hello, {user.username}</div>
                        {/* <li>
                            {user.firstName} {user.lastName}
                        </li> */}
                        <div className="user-email">{user.email}</div>
                        <div className="manage-spot-link">
                            <NavLink to="/current" className="no-underline">
                                Manage Spot
                            </NavLink>
                        </div>
                        <div>
                            <button className="logout-button" onClick={logout}>
                                Log Out
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
        </div>
    );
}

export default ProfileButton;
