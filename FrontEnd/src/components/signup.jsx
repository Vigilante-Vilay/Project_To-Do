import axios from "axios";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
export function SignUp(){
    const[user,setUser] = useState("");
    const[pass,setPass] = useState("");
    const navigate = useNavigate();
    
    function handleSignup(){
        if(!user || !pass){
            alert("Incorrect username or password")
            return;
        }
        axios.post("https://project-to-do-sigma.vercel.app/signup",{
            username: user,
            password: pass
        }).then((res)=>{
            axios.post("https://project-to-do-sigma.vercel.app/login",{
                username: user,
                password: pass
            }).then((res)=>{
                console.log("Successfully Logged in as well")
                const token = res.data.token;
                sessionStorage.setItem("token",token); //Saving the token in the sessionStorage
                setUser("");
                setPass("");
                navigate("/todos");
            }).catch((err)=>{
                console.log("Failure in logging in",err);
            })
        }).catch((err)=>{
            if(err.response){
                if(err.response.status==409){
                    alert("Username already taken.");
                }
                else if(err.response && err.response.data.error) {
                    alert(err.response.data.error); // Show alert with error message
                }else {
                    console.log(err);
                    alert("Failure in signup");
                }
            }
        })
    }
    return <div className="orientation">
        <h1 style={{fontFamily:"Calibri", color:"greenyellow"}}><b>To-Do App</b></h1><br></br>
        <input style={{padding: "5px"}} type="text" placeholder="Enter username" onChange={(e)=>{
            setUser(e.target.value);
        }}></input><br></br>
        <input style={{padding: "5px"}} type="password" placeholder="Enter Password" onChange={(e)=>{
            setPass(e.target.value);
        }}></input><br></br>
        <button className="button" onClick={handleSignup}>Submit</button>
    </div>
}