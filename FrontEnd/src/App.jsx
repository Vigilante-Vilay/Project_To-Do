import {BrowserRouter,Route,Routes,useNavigate} from "react-router-dom";
import { SignUp } from "./components/signup.jsx";
import { Login } from "./components/login.jsx";
import { Todos } from "./components/todos.jsx";
import "./App.css";
function App(){
    return <>
        <div className="app-background">
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AppBar/>}></Route>
                        <Route path="/signup" element={<SignUp/>}></Route> 
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/todos" element={<Todos/>}></Route>
                    </Routes>
            </BrowserRouter>
        </div>
    </>
}
function AppBar(){
    const navigate = useNavigate();
    return <div className="orientation">
        <h1 style={{fontFamily:"Calibri", color:"greenyellow"}}><b>To-Do App</b></h1><br></br>
        <button className="button"onClick={()=>{
            navigate("/signup")
        }}>Sign Up</button><br></br>
        <button className="button"onClick={()=>{
            navigate("/login")
        }}>Log-in</button>
    </div>
}

export default App;