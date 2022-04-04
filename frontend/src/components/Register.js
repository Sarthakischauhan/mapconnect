import { useState, useRef } from "react";
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import "./register.css";


const Register = ({setRegister}) => {
    const [success,setSuccess] = useState(null);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    console.log("Sarthak")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username : usernameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value
        }
        
        try{
            const res = await axios.post("http://localhost:8800/api/user/register",newUser);
            setSuccess(true);
        }
        catch(err) {
            console.log(err);
        }
    }
    
    return (
        // useRef is similar to useState it just updates the value without re-rendering
    <div className="registerContainer">
        <div className="logo">
          <Room className="logoIcon" />
          <span>MapConnect</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input autoFocus placeholder="username" ref={usernameRef} />
          <input type="email" placeholder="email" ref={emailRef} />
          <input
            type="password"
            min="6"
            placeholder="password"
            ref={passwordRef}
          />
          <button className="registerBtn" type="submit">
            Register
          </button>
          {success && (
            <span className="success">Successfull. You can login now!</span>
          )}
          {!success && <span className="failure">Something went wrong!</span>}
        </form>
        <Cancel
          className="registerCancel"
          onClick={() => setRegister(false)}
        />
    </div>
    )
}

export default Register;