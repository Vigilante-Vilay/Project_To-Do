import axios from "axios"
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import "../App.css";
export function Login(){
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(){
        if(!username || !password){
            alert("Incorrect username or password");
            return;
        }
        axios.post("https://project-to-pgm3ssxh7-vilay-aggarwals-projects.vercel.app/login",{
            username:username,
            password:password
        }).then((res)=>{
            const token = res.data.token;
            sessionStorage.setItem("token",token); //Saving the token in the sessionStorage
            console.log("Successful Login");
            navigate("/todos");
        }).catch((err)=>{
            if (err.response && err.response.data.error) {
                alert(err.response.data.error); // Show alert with error message
            } else {
                console.log(err);
                alert("Login Failed");
            }
        })
    }
    return <div className="orientation">
        <h1 style={{fontFamily:"Calibri", color:"greenyellow"}}><b>To-Do App</b></h1><br></br>
        <input style={{padding: "5px"}} type="text" placeholder="Enter Username" onChange={(e)=>{
            setUsername(e.target.value)
        }}></input><br></br>
        <input style={{padding: "5px"}} type="password" placeholder="Enter Password" onChange={(e)=>{
            setPassword(e.target.value)
        }}></input><br></br>
        <button className="button"onClick={handleLogin}>Login</button>
    </div>
}