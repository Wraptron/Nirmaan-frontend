// import React, { useState } from 'react';
// import "@fontsource/open-sans";
// import "@fontsource/josefin-sans";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import alertify from 'alertifyjs';
// import 'alertifyjs/build/css/alertify.css';
// import PuffLoader from "react-spinners/PuffLoader";
// import { Icon } from 'react-icons-kit';
// import { eyeOff } from 'react-icons-kit/feather/eyeOff';
// import { eye } from 'react-icons-kit/feather/eye';
// import image from '../assets/images/nirmaan-iitm.14fdf833.svg';
// import { LOGIN_API, FORGOT_PASSWORD_API } from '../API/endpoints';

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ user_mail: '', user_password: '' });
//   const [type, setType] = useState('password');
//   const [icon, setIcon] = useState(eyeOff);
//   const [loading, setLoading] = useState(false);

//   const handleToggle = () => {
//     setType(prev => prev === 'password' ? 'text' : 'password');
//     setIcon(prev => prev === eyeOff ? eye : eyeOff);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleForgotPassword = () => {
//     alertify.prompt('Email:', '')
//       .set({
//         title: 'Forgot Password',
//         type: 'text',
//         onshow: function () {
//           this.setContent('<input type="email" id="email_prompt" name="email_prompt" style="width: 100%;">');
//         },
//         onok: async function () {
//           const email = document.getElementById('email_prompt').value;
//           try {
//             const res = await axios.post(FORGOT_PASSWORD_API, { email_prompt: email });
//             if (res.data.Email_status === "exists") {
//               alertify.success('Email sent!');
//             } else if (res.data.Email_status.includes("does not exist")) {
//               alertify.warning("Email doesn't exist");
//             } else {
//               alertify.warning("Unexpected response");
//             }
//           } catch (err) {
//             alertify.error("Error sending reset email");
//           }
//         },
//         oncancel: function () {
//           alertify.warning('Hope you remember it 😁!');
//         }
//       }).show();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(LOGIN_API, formData);
//       const result = res.data.result;

//       if (res.data.authentication?.includes('username and password')) {
//         alertify.error('All fields are required to login');
//         setLoading(false);
//         return;
//       }

//       if (result?.status === 'Login Authenticated') {
//         localStorage.setItem('token', result.accessToken);
//         sessionStorage.setItem('role', result.role);
//         sessionStorage.setItem('userEmail', result.id);

//         switch (result.role) {
//           case 5:
//             navigate(`/startupprofile/${result.id}`);
//             break;
//           case 2:
//             navigate('/home');
//             break;
//           case 1:
//           case 3:
//             navigate('/finance/home');
//             break;
//           default:
//             navigate('/');
//         }
//       } else if (result?.status === 'User_not_found') {
//         alertify.error('User not found');
//       } else {
//         alertify.error('Login failed. Check your credentials.');
//       }
//     } catch (err) {
//       alertify.error('Login failed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex w-full h-screen">
//       <div className="w-full flex items-center justify-center lg:w-1/2">
//         <div className="bg-white px-10 py-20 rounded-xl border-2 border-green-400 shadow-lg w-full max-w-md">
//           <form onSubmit={handleSubmit}>
//             <h1 className="text-2xl font-semibold text-center text-gray-600">LOG IN</h1>

//             <div className="mt-6">
//               <label className="text-lg font-medium text-green-600">
//                 Email<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="user_mail"
//                 value={formData.user_mail}
//                 onChange={handleChange}
//                 required
//                 placeholder="username@example.com"
//                 className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent hover:border-green-300"
//               />

//               <label className="text-lg font-medium text-green-600 mt-4 block">
//                 Password<span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={type}
//                   name="user_password"
//                   value={formData.user_password}
//                   onChange={handleChange}
//                   required
//                   placeholder="Password"
//                   className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent hover:border-green-300"
//                 />
//                 <span
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 cursor-pointer"
//                   onClick={handleToggle}
//                 >
//                   <Icon icon={icon} size={22} />
//                 </span>
//               </div>

//               <div className="mt-4 text-right">
//                 <button
//                   type="button"
//                   onClick={handleForgotPassword}
//                   className="text-sm text-green-500 hover:underline"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="mt-6 w-full py-3 rounded-xl bg-green-500 text-white font-bold text-lg hover:scale-105 transition-all disabled:opacity-60 flex justify-center items-center"
//               >
//                 {loading ? <PuffLoader size={28} color="white" /> : 'Log in'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <div className="hidden lg:flex flex-col items-center justify-center w-1/2 h-full bg-green-600">
//         <img src={image} alt="Nirmaan IITM" className="mb-6" width="200px" />
//         <div className="text-5xl font-bold text-white mb-2">Trak<span className="text-yellow-300">tor</span></div>
//         <p className="text-white font-medium">Information management portal</p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import "@fontsource/open-sans";
import "@fontsource/josefin-sans";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import PuffLoader from "react-spinners/PuffLoader";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import image from '../assets/images/nirmaan-iitm.14fdf833.svg';
import { LOGIN_API, FORGOT_PASSWORD_API } from '../API/endpoints';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ user_mail: '', user_password: '' });
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setType(prev => prev === 'password' ? 'text' : 'password');
    setIcon(prev => prev === eyeOff ? eye : eyeOff);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleForgotPassword = () => {
    alertify.prompt('Email:', '')
      .set({
        title: 'Forgot Password',
        type: 'text',
        onshow: function () {
          this.setContent('<input type="email" id="email_prompt" name="email_prompt" style="width: 100%;">');
        },
        onok: async function () {
          const email = document.getElementById('email_prompt').value;
          try {
            // Use the full URL directly to avoid double URL issue
            const fullForgotUrl = FORGOT_PASSWORD_API.startsWith('http') 
              ? FORGOT_PASSWORD_API 
              : `http://3.109.48.163${FORGOT_PASSWORD_API}`;
            
            const res = await axios.post(fullForgotUrl, { email_prompt: email });
            if (res.data.Email_status === "exists") {
              alertify.success('Email sent!');
            } else if (res.data.Email_status.includes("does not exist")) {
              alertify.warning("Email doesn't exist");
            } else {
              alertify.warning("Unexpected response");
            }
          } catch (err) {
            console.error('Forgot password error:', err);
            alertify.error("Error sending reset email");
          }
        },
        oncancel: function () {
          alertify.warning('Hope you remember it 😁!');
        }
      }).show();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', formData);
      
      // Create the full URL properly
      const fullLoginUrl = LOGIN_API.startsWith('http') 
        ? LOGIN_API 
        : `http://3.109.48.163${LOGIN_API}`;
      
      console.log('Request URL:', fullLoginUrl);
      
      const res = await axios.post(fullLoginUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      
      console.log('Login response:', res.data);
      
      const result = res.data.result;

      if (res.data.authentication?.includes('username and password')) {
        alertify.error('All fields are required to login');
        setLoading(false);
        return;
      }

      if (result?.status === 'Login Authenticated') {
        localStorage.setItem('token', result.accessToken);
        sessionStorage.setItem('role', result.role);
        sessionStorage.setItem('userEmail', result.id);

        switch (result.role) {
          case 5:
            navigate(`/startupprofile/${result.id}`);
            break;
          case 2:
            navigate('/home');
            break;
          case 1:
          case 3:
            navigate('/finance/home');
            break;
          default:
            navigate('/');
        }
      } else if (result?.status === 'User_not_found') {
        alertify.error('User not found');
      } else {
        alertify.error('Login failed. Check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // More specific error handling
      if (err.code === 'ERR_NETWORK') {
        alertify.error('Network error. Cannot connect to server.');
      } else if (err.response?.status === 0) {
        alertify.error('Cannot connect to server. Please check if the server is running.');
      } else if (err.response?.status === 401) {
        alertify.error('Invalid credentials. Please try again.');
      } else if (err.message.includes('CORS')) {
        alertify.error('CORS error. Please contact support.');
      } else {
        alertify.error('Login failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-xl border-2 border-green-400 shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-center text-gray-600">LOG IN</h1>

            <div className="mt-6">
              <label className="text-lg font-medium text-green-600">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="user_mail"
                value={formData.user_mail}
                onChange={handleChange}
                required
                placeholder="username@example.com"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent hover:border-green-300"
              />

              <label className="text-lg font-medium text-green-600 mt-4 block">
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={type}
                  name="user_password"
                  value={formData.user_password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent hover:border-green-300"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 cursor-pointer"
                  onClick={handleToggle}
                >
                  <Icon icon={icon} size={22} />
                </span>
              </div>

              <div className="mt-4 text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-green-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full py-3 rounded-xl bg-green-500 text-white font-bold text-lg hover:scale-105 transition-all disabled:opacity-60 flex justify-center items-center"
              >
                {loading ? <PuffLoader size={28} color="white" /> : 'Log in'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 h-full bg-green-600">
        <img src={image} alt="Nirmaan IITM" className="mb-6" width="200px" />
        <div className="text-5xl font-bold text-white mb-2">Trak<span className="text-yellow-300">tor</span></div>
        <p className="text-white font-medium">Information management portal</p>
      </div>
    </div>
  );
}

export default Login;