import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/authCont";
import { doSignOut } from "../../Firebase/auth";
import { User } from "lucide-react";

const Header = ({
  showProfile,
  setShowProfile,
}) => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <header>
      <h1>UIDAI Authentication Portal</h1>
      {userLoggedIn && (
        <div className="profile-menu">
          <button
            className="profile-button"
            onClick={() => setShowProfile(!showProfile)}
          >
            <User size={24} />
          </button>
          {showProfile && (
            <div className="profile-dropdown">
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;


// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../contexts/authContext/index'
// import { doSignOut } from '../../firebase/auth'

// const Header = () => {
//     const navigate = useNavigate()
//     const { userLoggedIn } = useAuth()
//     return (
//         <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
//             {
//                 userLoggedIn
//                     ?
//                     <>
//                         <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
//                     </>
//                     :
//                     <>
//                         <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
//                         <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
//                     </>
//             }

//         </nav>
//     )
// }

// export default Header