import React, {useState} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';

function Register(){
     const [showPassword, setShowPassword] = useState(false);
     const [errorMessage, setErrorMessage]= useState("");
     const [userInput, setUserInput] = useState({username:"", password:"", confirmpassword:""});

     function togglePassword(){
        setShowPassword((prev)=>{
            return !prev;
        });
        console.log("Password Revealed");
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

    function handleFormSubmit(e){
        e.preventDefault();
        setErrorMessage("");

        //Validate empty field
         if(userInput.username.trim() === "" || userInput.password.trim()=== "" || userInput.confirmpassword.trim()=== ""){
             setErrorMessage("Fields cannot be empty.")
             return;
            }  

        //Validate password match
         if(userInput.password !== userInput.confirmpassword){
            setErrorMessage("Passwords do not match.");
            return;
         }   

            // Registration complete
        setErrorMessage("Registration Successful!");
        console.log("Registration data saved:", userInput);

        // Clear fields
        setUserInput({ username: "", password: "", confirmpassword: "" })
    }

    return(
        <>
        <div className="login-container">
            <div className="left-content register-bg">
                <h2 className="logo">Expen$e<span className="logo-text">Tracker</span></h2>
            </div>
            <div className="right-content">
                <div className="logo-wrapper">
                <h2 className="login-text">Register</h2>
                </div>
                
                <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input name="username" value={userInput.username} type="text" placeholder="Enter username" onChange={handleUserInput}/>
                <PermIdentityIcon className="input-icon"/>

                <label htmlFor="password">Password:</label>
                <input name="password" value={userInput.password} type={showPassword ? "text" : "password" }  placeholder="Enter password" onChange={handleUserInput}/>
                <LockOutlinedIcon className="input-icon"/>

                {showPassword? (<VisibilityOutlinedIcon className="input-icon-password" onClick={togglePassword}/>) : (<VisibilityOffOutlinedIcon  className="input-icon-password" onClick={togglePassword}/>)}

                <label htmlFor="confirmpassword">Confirm Password:</label>
                <input name="confirmpassword" value={userInput.confirmpassword} type={showPassword ? "text" : "password" }  placeholder="Confirm password" onChange={handleUserInput}/>
                <LockOutlinedIcon className="input-icon"/>

                {showPassword? (<VisibilityOutlinedIcon className="input-icon-password" onClick={togglePassword}/>) : (<VisibilityOffOutlinedIcon  className="input-icon-password" onClick={togglePassword}/>)}

                <h3 className = {errorMessage === "Registration Successful!" ? "login-success" : "login-failed" }>
                    {errorMessage}
                </h3> 

                <button type="submit"><PersonAddAlt1OutlinedIcon/>Register</button>
                </form>
                <p className="account-prompt">Already have an account? <span><a href="#">Login</a></span></p>
            </div>
        </div>
        </>
    )
}

export default Register;