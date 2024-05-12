import {React, useState, useRef} from "react";
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import { wait } from "../utils/Functionabilities";
import LoadingOverlay from "../items/LoadingOverlay";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { BackendURL } from "../configs/GlobalVar";
import { Auth, Provider } from "../configs/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

function Register () {
    const cookies = new Cookies();
    const [loading, SetLoading] = useState(false);
    const navigate = useNavigate()
    const [emailInvalid, SetEmailInvalid] = useState(false);
    const [signInGoogleCancelled, setSignInGoogleCancelled] = useState(false);
    const [usernameInvalid, SetUsernameInvalid] = useState(false);
    const [passwordInvalid, SetPasswordInvalid] = useState(false);
    const [ConfirmPasswordInvalid, SetConfirmPasswordInvalid] = useState(false);
    const [showPassword, SetShowPassword] = useState(false);
    const [showConfirmPassword, SetShowConfirmPassword] = useState(false);
    const [registrationFailed, SetregistrationFailed] = useState(false);
    const [emailTaken, SetEmailTaken] = useState(false);

    const ToggleShowPassword = () => {
        SetShowPassword(!showPassword)
    }

    const ToggleShowConfirmPassword = () => {
        SetShowConfirmPassword(!showConfirmPassword)
    }

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    function isValidEmailAddress(address) {
        return !! address.match(/.+@.+/);
    }

    const TryRegister = async () => {
        SetLoading(true);
        await axios.post(`${BackendURL}/register/`, {
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        })
            .then(async (response) => {
                if (response.data["detail"] === "email already exist") {
                    SetEmailTaken(true);
                    SetLoading(false);
                }
                else if (response.data["detail"] === "registration failed") {
                    SetregistrationFailed(true);
                    SetLoading(false);
                }
                else {
                    if (response.data["detail"]) {
                        await wait(300);
                        SetLoading(false);
                        navigate("/login");
                    }
                }
            })
            .catch((error) => {
                SetregistrationFailed(true);
                SetLoading(false);
                console.log(error, 'error');
            });
    }

    const SignInWithGoogle = async () => {
        setSignInGoogleCancelled(false);
        SetLoading(true);
        signInWithPopup(Auth,Provider).then(async (res) => {
            const result = res.user.toJSON();
            await axios.post (`${BackendURL}/sign-in-google/`, {
                email: result["email"],
                username: result["displayName"]
            }).then(async (res) => {
                if (res.data["detail"] === "sign in failed") {
                    SetLoading(false);
                    setSignInGoogleCancelled(true);
                }
                else 
                {
                    if (res.data["detail"]) {
                        // save token in cookies
                        cookies.set("jwt_auth", res.data["detail"], { "sameSite": "strict", "secure":"true" })
                        await wait(300);
                        SetLoading(false);
                        navigate("/");
                    }
                }
            })
            .catch ((e) => {
                SetLoading(false);
                setSignInGoogleCancelled(true);
                console.log(e, 'error');
            })
        })
        .catch((e) => {
            setSignInGoogleCancelled(true);
            SetLoading(false);
        })
      }

    function handleSubmit(event) {
        event.preventDefault();
        SetregistrationFailed(false);
        SetEmailTaken(false);
        SetEmailInvalid(false);
        SetPasswordInvalid(false);
        SetConfirmPasswordInvalid(false);
        let emailValid = true;
        let passwordValid = true;
        let usernameValid = true;
        let confirmPasswordValid = true;

        if (!isValidEmailAddress(emailRef.current.value.trim()))
        {
            SetEmailInvalid(true);
            emailValid = false;
        }

        if (passwordRef.current.value.trim() === "")
        {
            SetPasswordInvalid(true);
            passwordValid = false;
        }

        if (confirmPasswordRef.current.value.trim() !== passwordRef.current.value.trim())
        {
            SetConfirmPasswordInvalid(true);
            confirmPasswordValid = false;
        }

        if (emailValid && usernameValid && passwordValid && confirmPasswordValid)
        {
            TryRegister();
        }
    }

    return (  
        <div className="flex h-[100vh] w-full flex-col bg-gray-100 py-10">
            {loading ? <LoadingOverlay /> : <div/>}
            {/* Login form */}
            <form onSubmit={handleSubmit} className="flex flex-col px-6 py-6 text-center mx-auto my-[40px] bg-white rounded-xl md:w-[500px] w-[350px] shadow-lg" noValidate>

                {/* login info */}
                <div className="my-2">
                    <p className="mb-3 text-4xl font-extrabold text-dark-grey-900">Register</p>
                    <p className="mb-4 text-grey-700">Create your account</p>
                    <p className={`mb-4 text-pink-600 ${registrationFailed ? "block": "hidden"} animate-nav-bars-menu-popup`}>Registration failed, please try again</p>
                    <p className={`mb-4 text-pink-600 ${emailTaken ? "block": "hidden"} animate-nav-bars-menu-popup`}>email is already taken, please use another email</p>
                </div>

                {/* register fields */}

                {/* email field */}
                <div className="flex flex-col mb-5">
                    <label for="email" className="mb-2 text-sm text-start text-grey-900">Email</label>
                    <input id="email" type="email" ref={emailRef} required={emailInvalid} placeholder="Email" className="w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer"/>
                    <p htmlFor="email" className="text-start hidden peer-required:block peer-invalid:block text-pink-600 text-sm px-2 animate-nav-bars-menu-popup">Please provide a valid email address.</p>
                </div>

                {/* password field */}
                <div className="flex flex-col mb-5">
                    <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password</label>
                    <div className="relative">
                        <input id="password" ref={passwordRef} required={passwordInvalid} type={showPassword ? "text" : "password"} placeholder="Password" className="flex items-center w-full pl-5 pr-10 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer"/>
                        {showPassword ? 
                            <VisibilityOffIcon className={`absolute right-2 -translate-y-[50%] peer-required:-translate-y-[90%] top-[50%] text-gray-400 hover:text-gray-500`} onClick={ToggleShowPassword}/>
                            :
                            <VisibilityIcon className={`absolute right-2 -translate-y-[50%] peer-required:-translate-y-[90%] top-[50%] text-gray-400 hover:text-gray-500`} onClick={ToggleShowPassword}/>
                        }
                        <p htmlFor="password" className="relative text-start hidden text-pink-600 peer-required:block text-sm px-2 animate-nav-bars-menu-popup">Please provide a password.</p>
                    </div>
                </div>
                
                {/* confirm password field */}
                <div className="flex flex-col mb-5">
                    <label htmlFor="confirm_password" className="mb-2 text-sm text-start text-grey-900">Confirm Password</label>
                    <div className="relative">
                        <input id="confirm_password" ref={confirmPasswordRef} required={ConfirmPasswordInvalid} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="flex items-center w-full pl-5 pr-10 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer"/>
                        {showConfirmPassword ? 
                            <VisibilityOffIcon className={`absolute right-2 -translate-y-[50%] peer-required:-translate-y-[90%] top-[50%] text-gray-400 hover:text-gray-500`} onClick={ToggleShowConfirmPassword}/>
                            :
                            <VisibilityIcon className={`absolute right-2 -translate-y-[50%] peer-required:-translate-y-[90%] top-[50%] text-gray-400 hover:text-gray-500`} onClick={ToggleShowConfirmPassword}/>
                        }
                        <p htmlFor="confirm_password" className="relative text-start hidden text-pink-600 peer-required:block text-sm px-2 animate-nav-bars-menu-popup">Password doesn't match</p>
                    </div>
                </div>

                {/* Register Button*/}
                <button type={"submit"} className="max-w-[250px] min-w-[250px] mx-auto px-6 py-5 my-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-green-700 focus:ring-4 focus:ring-purple-100 bg-green-600">Register</button>
                
                <div className="flex flex-row mx-auto">
                    <p className="text-sm leading-relaxed text-gray-900 mr-2">Already registered?</p>
                    <button onClick={() => navigate("/login")}>
                        <p className="text-sm font-bold text-grey-700 hover:underline">Sign in</p>
                    </button>
                </div>
            </form>      
        </div>
    )
}

export default Register;