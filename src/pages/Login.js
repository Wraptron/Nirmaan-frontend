import React, { useState } from 'react';
import "@fontsource/open-sans";
import '@fontsource/josefin-sans';
import image from '../assets/images/nirmaan-iitm.14fdf833.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import PuffLoader from "react-spinners/PuffLoader";
import APP_URL from '../Config';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

function Login() {  
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        user_mail: '',
        user_password: ''
    }) 
    const [icon, setIcon] = useState(eyeOff);
    const [type, setType] = useState('password');
    const [loading, setLoading] = useState(false); 
    
    const handleToggle = () => {
        if(type==='password')
        {
            setIcon(eye);
            setType('text');
        }
        else 
        {
            setIcon(eyeOff)
            setType('password')
        }
    }
    
    const handleForgotPassword = () => {
        alertify.prompt('Email:', '')
            .set({
                'onshow': function() {
                    this.setContent('<input type="email" id="email_prompt" name="email_prompt" style="width: 100%;">');
                },
                'title': 'Forgot Password',
                'type': 'text',
                'size': 'large',
                'width': '100%',
                'onok': async function(event, value){
                    var data = document.getElementById('email_prompt').value;
                    var datajson = {'email_prompt': data};
                    try
                    {
                        const response  = await axios.post(APP_URL + 'forgot-password', datajson);
                        if(response.data.Email_status === "exists")
                        {
                            alertify.success('Email sent!');
                        }
                        else if(response.data.Email_status === "Email does not exist! please provide valid email address")
                        {
                            alertify.warning("Email doesn't exist");
                        }
                        else
                        {
                            alertify.warning("Unexpected response");
                        }
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                },
                'oncancel': function(){
                    alertify.warning('Hope you remember it😁!');
                }
            }).show();
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]: value,
        }))
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        
        try
        {
            const response = await axios.post(APP_URL+'login', formData);
            
            if(response.data.authentication === "Please enter username and password properly!")
            {
                alertify.error('All fields are required to login');
                setLoading(false);
                return;
            }
            
            if(response.data.result && response.data.result.status === 'Login Authenticated')
            {
                const accessToken = response.data.result.accessToken;
                const userRole = response.data.result.role;
                const startup_id  = response.data.result.userData?.startup_id
                
                // console.log('Login response:', response.data);
                // console.log('User role:', userRole);
                
                // Store token and role
                localStorage.setItem('token', accessToken);
                sessionStorage.setItem('token', accessToken);
                sessionStorage.setItem('role', userRole);
                sessionStorage.setItem('startup_id', startup_id);
                
                setError('');
                setLoading(false);
                
                // Navigate based on role
                if(userRole === 5) // Student role
                {
                    // console.log('Navigating to startup profile for user:', startup_id);
                    navigate(`/startups/startupprofile/${startup_id}`);
                }
                else if(userRole === 2) // Admin role
                {
                    navigate('/home');
                }
                else if(userRole === 3) // Finance role
                {
                    navigate('/finance/home');
                }
                else if(userRole === 1) // Other finance role
                {
                    navigate('/finance/home');
                }
                else
                {
                    navigate('/');
                }
            }
            else if(response.data.result && response.data.result.status === 'User_not_found')
            {
                alertify.error('User not found');
                setLoading(false);
            }
            else
            {
                alertify.error('Login failed. Please check your credentials.');
                setLoading(false);
            }
        }
        catch(error)
        {
            console.log("Login Failed:", error);
            alertify.error('Login failed. Please try again.');
            setLoading(false);
        }
    }
    
    return(
            <div className="flex w-full h-screen">
                <div className="w-full flex items-center justify-center lg:w-1/2">
                    <div className="bg-white px-10 py-20 rounded-xl border-2 border-green-400">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold text-gray-600">LOG IN</h1>
                            <div className="mt-8">
                                <div>
                                    <label className="text-lg font-medium text-green-600">Email<span className="text-red-500">*</span></label>
                                    <input 
                                        name="user_mail" 
                                        value={formData.user_mail} 
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent hover:border-green-300"
                                        placeholder="username@example.com"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-medium text-green-600">Password<span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input 
                                            name="user_password" 
                                            value={formData.user_password} 
                                            onChange={handleChange}
                                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent hover:border-green-300"
                                            placeholder="Password"
                                            type={type}
                                            required
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 cursor-pointer" onClick={handleToggle}>
                                            <Icon icon={icon} size={25}/>
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-between items-center" >
                                    <button type="button" className="text-green-500 cursor-pointer" onClick={handleForgotPassword}>Forgot Password</button>
                                </div>
                                <div className='mt-3 flex flex-col gap-y-4'>
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all py-3 rounded-xl bg-green-500 text-white text-lg font-bold flex items-center justify-center disabled:opacity-50"
                                    >
                                        {loading ? (<PuffLoader size={28} color="gold" ariaLabel="Loading"/>):('Log in')}
                                    </button>
                                </div>
                            </div>
                            </form>
                    </div>
                </div>
                <div className="hidden relative lg:flex flex-col items-center w-1/2 justify-center h-full bg-green-600">
                        <img src={image} alt="Nirmaan IITM" className="mb-4" width="30%"/>
                        <div className="text-4xl font-bold mb-4">Trak<span className="text-white">tor</span></div>
                        <div className="w-full flex justify-center font-semibold text-white">Information management portal</div>
                </div>
            </div>
    );        
}
  
export default Login;
