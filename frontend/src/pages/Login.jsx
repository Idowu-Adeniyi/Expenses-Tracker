import React,{useState} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';



function Login(){
    const [showPassword, setShowPassword] = useState(false);
    const [userInput, setUserInput] = useState({username:"", password:""});
    const [errorMessage, setErrorMessage]= useState("");

    //Mock Data
    const validUser = {
            username: "monday50",
            password: "password123"
        }

     function revealPassword(){
        setShowPassword(true)
        console.log("Password Revealed");
    }
    
    function hidePassword(){
        setShowPassword(false)
        console.log("Password Hidden");
    }

    function handleFormSubmit(e){
        e.preventDefault();
        setErrorMessage("");

        //User Login Validation
         //Grab the absolute freshest data directly from the HTML inputs
        const formData = new FormData(e.currentTarget);
        const enteredUsername = formData.get("username")?.trim();
        const enteredPassword = formData.get("password");

         //  Validate emptiness first
        if (!enteredUsername || !enteredPassword) {
            setErrorMessage("Fields cannot be empty.");
            return; 
        }

        //  Compare the fresh input data against the valid record
        if (enteredUsername !== validUser.username || enteredPassword !== validUser.password) {
            setErrorMessage("Login failed! Wrong username or password.");
            return; 
        }
 
            // If user succeed
            setErrorMessage("Login Successful!") 

            // Cler the state object
            setUserInput({username: "", password: ""});
            console.log("Form cleared and redirecting to dashboard!")
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

                <p className="account-prompt">Dont have an account? <span><a href="#">Register</a></span></p>
            </div>
        </div>
        </>
    )
}

export default Login;