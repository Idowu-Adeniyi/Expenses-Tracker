import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function Login(){
    const navigate = useNavigate(); 
    const [showPassword, setShowPassword] = useState(false);
    const [userInput, setUserInput] = useState({username:"", password:""});
    const [errorMessage, setErrorMessage]= useState("");

     function revealPassword(){
        setShowPassword(true)
        console.log("Password Revealed");
    }
    
    function hidePassword(){
        setShowPassword(false)
        console.log("Password Hidden");
    }

    async function handleFormSubmit(e){
        e.preventDefault();
        setErrorMessage("");

        //User Login Validation
        if (!userInput.username.trim() || !userInput.password) {
            setErrorMessage("Fields cannot be empty");
            return; 
        }
        try{
            const response = await axios.post("http://localhost:3000/api/login",userInput)

            //Extract the token and safe user details sent by express
            const {token, user} = response.data;
          
            // Save the token into the browser's memory
            localStorage.setItem("authToken", token);
            localStorage.setItem("currentUser", JSON.stringify(user));

            // If user succeed
            setErrorMessage("Login Successful!") 
            // Clear the state object
            setUserInput({username: "", password: ""});
            
            //Redirect user to dashboard
            setTimeout(()=>{
                navigate("/dashboard");
            },1000)

        }catch(error){
            console.error(error.message);
            if(error.response && error.response.data){
                setErrorMessage(error.response.data.message);
            }else {
                 setErrorMessage("Login Failed, Please try again later!");
            }
        }      
    }

    function handleUserInput(e){
        const {name, value} = e.target;
            setUserInput((prev)=>{
                return{
                    ...prev,
                    [name]:value
                };
            })
    }

    return(
        <>
        <div className="login-container">
            <div className="left-content login-bg">
                <h2 className="logo">Expen$e<span className="logo-text">Tracker</span></h2>
            </div>
            <div className="right-content">
                <div className="logo-wrapper">
                <h2 className="login-text">Login</h2>
                </div>
               
                <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input name="username" value={userInput.username}  type="text" placeholder="Enter username" onChange={handleUserInput}/>
                <PermIdentityIcon className="input-icon"/>

                <label htmlFor="password">Password:</label>
                <input name="password" value={userInput.password}  type={showPassword ? "text" : "password" } placeholder="Enter password" onChange={handleUserInput}/>
                <LockOutlinedIcon className="input-icon"/>

                {showPassword? <VisibilityOutlinedIcon className="input-icon-password" onClick={hidePassword}/> : <VisibilityOffOutlinedIcon className="input-icon-password" onClick={revealPassword}/>}
                
                <h3 className = {errorMessage === "Login Successful!" ? "login-success" : "login-failed" }>
                    {errorMessage}
                </h3> 

                <button type="submit"><LoginOutlinedIcon />Login</button>
                </form>

                <p className="account-prompt">Dont have an account? <span><Link to="/register">Register</Link></span></p>
            </div>
        </div>
        </>
    )
}

export default Login;