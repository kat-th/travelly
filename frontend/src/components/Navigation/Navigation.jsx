import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className="nav-bar">
            <div className="nav-left">
                <NavLink to="/">
                    <img src="/travelly.png" className="home-logo" size={10} />
                </NavLink>
            </div>
            {isLoaded && (
                <div className="nav-right">
                    <div>
                        {sessionUser && (
                            <NavLink to="/create-spot" className="create-spot-link">
                                Create a New Spot
                            </NavLink>
                        )}
                    </div>
                    <div>
                        <ProfileButton user={sessionUser} />
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navigation;
