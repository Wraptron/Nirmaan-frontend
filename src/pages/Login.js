import React, { useEffect, useState } from 'react';
import "@fontsource/open-sans";
import '@fontsource/josefin-sans';
import image from '../assets/images/nirmaan-iitm.14fdf833.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthSession } from '../utils/authSession';
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
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [forgotStepVisible, setForgotStepVisible] = useState(false);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [resendTimer, setResendTimer] = useState(0);
    
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
    
    useEffect(() => {
        if (!otpSent) {
            return undefined;
        }

        const timerInterval = setInterval(() => {
            setOtpTimer((previous) => (previous > 0 ? previous - 1 : 0));
            setResendTimer((previous) => (previous > 0 ? previous - 1 : 0));
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [otpSent]);

    const handleForgotPassword = () => {
        setForgotStepVisible(true);
        setForgotPasswordData((previous) => ({
            ...previous,
            email: formData.user_mail || previous.email,
        }));
    }

    const closeForgotPasswordModal = () => {
        setForgotStepVisible(false);
        setOtpSent(false);
        setOtpTimer(0);
        setResendTimer(0);
        setForgotPasswordData({
            email: "",
            otp: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const handleForgotInputChange = (e) => {
        const { name, value } = e.target;
        setForgotPasswordData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const requestOtp = async (isResend = false) => {
        const email = forgotPasswordData.email.trim();
        if (!email) {
            alertify.warning("Please enter your email.");
            return;
        }

        setForgotLoading(true);
        try {
            const endpoint = isResend ? "forgot-password/resend-otp" : "forgot-password/request-otp";
            const response = await axios.post(APP_URL + endpoint, { email });
            const expiresInSeconds = response?.data?.expiresInSeconds || 300;
            const resendAvailableInSeconds = response?.data?.resendAvailableInSeconds || 30;

            setOtpSent(true);
            setOtpTimer(expiresInSeconds);
            setResendTimer(resendAvailableInSeconds);
            alertify.success(isResend ? "OTP resent successfully." : "OTP sent to your email.");
        } catch (err) {
            const message = err?.response?.data?.message || "Failed to send OTP.";
            const resendAvailableInSeconds = err?.response?.data?.resendAvailableInSeconds;
            if (resendAvailableInSeconds) {
                setResendTimer(resendAvailableInSeconds);
            }
            alertify.error(message);
        } finally {
            setForgotLoading(false);
        }
    };

    const handleResetPassword = async () => {
        const { email, otp, newPassword, confirmPassword } = forgotPasswordData;
        if (!email || !otp || !newPassword || !confirmPassword) {
            alertify.warning("All fields are required for password reset.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alertify.error("Passwords do not match.");
            return;
        }

        setForgotLoading(true);
        try {
            const response = await axios.post(APP_URL + "forgot-password/verify-otp", {
                email: email.trim(),
                otp: otp.trim(),
                new_password: newPassword,
            });

            if (response?.data?.success) {
                alertify.success(response.data.message || "Password reset successful.");
                closeForgotPasswordModal();
            } else {
                alertify.error(response?.data?.message || "Password reset failed.");
            }
        } catch (err) {
            const message = err?.response?.data?.message || "Password reset failed.";
            alertify.error(message);
        } finally {
            setForgotLoading(false);
        }
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
            const response = await axios.post(APP_URL + 'login', formData, {
                withCredentials: true,
            });
            // console.log(response)
            
            if(response.data.authentication === "Please enter username and password properly!")
            {
                alertify.error('All fields are required to login');
                setLoading(false);
                return;
            }
            
            if(response.data.result && response.data.result.status === 'Login Authenticated')
            {
                const { role: userRole, startup_id, mentor_id, user_mail, user_name } =
                    response.data.result;

                setAuthSession({
                    role: userRole,
                    startup_id,
                    mentor_id,
                    user_mail,
                    user_name,
                });
                
                setError('');
                setLoading(false);
                
                // Navigate based on role
                if(userRole === 5) // Student role
                {
                    navigate(`/startups/startupprofile/${startup_id}`);
                }
                else if(userRole === 6) // Mentor role - show only that mentor's profile
                {
                    navigate(`/mentors/mentor_profile/${mentor_id}`);
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
            else if(response.data.result && response.data.result.status !== 'Login Authenticated')
            {
                alertify.error(response.data.result.status);
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

                {forgotStepVisible && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
                        <div className="w-full max-w-md rounded-xl bg-white border border-green-300 p-5 shadow-lg">
                            <h2 className="text-lg font-semibold text-green-700">Reset Password with OTP</h2>
                            <div className="mt-3">
                                <label className="text-sm font-medium text-green-700">Email</label>
                                <input
                                    name="email"
                                    value={forgotPasswordData.email}
                                    onChange={handleForgotInputChange}
                                    className="w-full border rounded-lg p-2 mt-1"
                                    placeholder="username@example.com"
                                    type="email"
                                />
                            </div>
                            <div className="mt-3 flex gap-2">
                                <button
                                    type="button"
                                    disabled={forgotLoading}
                                    className="px-3 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
                                    onClick={() => requestOtp(false)}
                                >
                                    Send OTP
                                </button>
                                <button
                                    type="button"
                                    disabled={forgotLoading || !otpSent || resendTimer > 0}
                                    className="px-3 py-2 rounded-lg border border-green-600 text-green-700 disabled:opacity-50"
                                    onClick={() => requestOtp(true)}
                                >
                                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                                </button>
                            </div>
                            {otpSent && (
                                <p className="mt-2 text-xs text-gray-600">
                                    OTP valid for {otpTimer}s
                                </p>
                            )}
                            <div className="mt-3">
                                <label className="text-sm font-medium text-green-700">OTP</label>
                                <input
                                    name="otp"
                                    value={forgotPasswordData.otp}
                                    onChange={handleForgotInputChange}
                                    className="w-full border rounded-lg p-2 mt-1"
                                    placeholder="Enter 6-digit OTP"
                                    type="text"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="text-sm font-medium text-green-700">New Password</label>
                                <input
                                    name="newPassword"
                                    value={forgotPasswordData.newPassword}
                                    onChange={handleForgotInputChange}
                                    className="w-full border rounded-lg p-2 mt-1"
                                    placeholder="Enter new password"
                                    type="password"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="text-sm font-medium text-green-700">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    value={forgotPasswordData.confirmPassword}
                                    onChange={handleForgotInputChange}
                                    className="w-full border rounded-lg p-2 mt-1"
                                    placeholder="Re-enter new password"
                                    type="password"
                                />
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    type="button"
                                    disabled={forgotLoading || !otpSent || otpTimer <= 0}
                                    className="px-3 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
                                    onClick={handleResetPassword}
                                >
                                    Verify OTP & Reset Password
                                </button>
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded-lg border border-gray-400 text-gray-700"
                                    onClick={closeForgotPasswordModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    );        
}
  
export default Login;
