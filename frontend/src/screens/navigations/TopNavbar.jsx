import HouseIcon from '@mui/icons-material/House';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, Typography, Toolbar, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faRightFromBracket, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { openLogin, closeLogin, setLogout } from '../../state';
// import { makeStyles } from '@emotion/styled'
// import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
// import imgURL from '../../../src/osei.jpg';
import './TopNavbar.css'
import UserIcons from '../users/UserIcons';
import { useContext } from 'react';
import { Context } from '../../stateManagement/context/ContextProvider';
import currentUser from '../../stateManagement/context/ContextProvider';
// import { useValue } from '../../stateManagement/context/ContextProvider';

// const navigate = useNavigate();
// const user = {name: 'Nat', imgURL: imgURL} 

const Navbar = () => {
  // const {state: {currentUser}, dispatch} = useValue();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    dispatch(openLogin()); // Dispatch openLogin action
  };

  const handleLogoutClick = () => {
    dispatch(setLogout()); // Dispatch setLogout action
    navigate('/login'); // Navigate to home page
  };

  return (
    <div className="navbar">
      <nav>
        <Toolbar>
          <Link to='/' className="link">
            <div className="brand">
              <h3>Whatsapp Ghana</h3>
              
              {/* <img src="./akwaaba-low-white.png" width='40px' height='40px' alt="logo" /> */}
            </div>
          </Link>
          <Link to='/' className="link">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
            <Link className="link">
          <FontAwesomeIcon icon={faBars} />
          </Link>
          <div className="right-icons">
            <Link to='/register' className="link">
              <FontAwesomeIcon icon={faUnlock} />
            </Link>
            {!user ? (
              <Link to='/login'
                className="link" 
                // onClick={() => dispatch({type: 'UPDATE_USER', payload:user})}
                onClick={handleLoginClick}
              >
                <FontAwesomeIcon icon={faRightToBracket} />
              </Link>
            ) : (
              <UserIcons />
            )}
            <Link to='/logout' className="link"
              onClick={handleLogoutClick}
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </Toolbar>
      
      </nav>
    </div>
  );
};

export default Navbar;