import {useState,useEffect} from "react";
import axios from "axios";
import trashIcon from "./trash.png"
import "../App.css";
export function Todos(){
    const[todos,setTodos] = useState([]);
    const[newTitle,setNewTitle] = useState("");
    const[newDescription,setNewDescription] = useState("");
    const token = sessionStorage.getItem("token");

    useEffect(()=>{
        axios.get("project-to-do-backend.vercel.app/Todos",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res)=>{
            setTodos(res.data.todos)
        }).catch((err)=>{
            console.log("Failure in fetching",err);
        })
    },[])

    function addTodo(){
        if(!newTitle || !newDescription){
            console.log("Title or Description cannot be empty");
            return;
        }
        axios.post("project-to-do-backend.vercel.app/AddTodo",{
            title: newTitle,
            description: newDescription
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            setTodos((prevTodos)=>{
                return [...prevTodos,res.data.todo];
            })
            setNewTitle("");
            setNewDescription("");
        }).catch((err)=>{
            console.log("Failure in adding",err);
        })
    }
    function updateTodo(todo){
        axios.put("project-to-do-backend.vercel.app/UpdateTodo",{
            title: todo.Title
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
                console.log("Succesfully updated")
                setTodos((prevTodos)=>{
                    return prevTodos.map((t)=>{
                        return t.Title == todo.Title ?{...t,Completed:true} : t;
                    })
                })
        }).catch((err)=>{
            console.log("Failure in updating",err);
        })
    }

    function deleteTodo(todo){
        axios.delete("project-to-do-backend.vercel.app/DeleteTodo",{
            headers: {
                Authorization: `bearer ${token}`
            },
            data:{title:todo.Title}
        }).then((res)=>{
            console.log("Succesfully Deleted")
            setTodos((prevTodos) => 
                prevTodos.filter((t) => t.Title !== todo.Title) // Returning a new array
            );            
        }).catch((err)=>{
            console.log("Error in deletion",err);
        })
    }
    return <div>
            <h1 style={{fontFamily:"Calibri" ,display:"flex", justifyContent:"center", color:"greenyellow"}}><b>To-Do App</b></h1><br></br>
            <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                <input style={{padding: "3px" ,margin:"3px"}}type="text" placeholder="Enter Task" onChange={(e)=>{
                setNewTitle(e.target.value);
                }}></input>
                <input style={{padding: "3px" ,margin:"3px"}}type="text" placeholder="Enter Description About Task" onChange={(e)=>{
                setNewDescription(e.target.value);
                }}></input>
                <button className="button"onClick={addTodo}>Add Todo</button>
            </div><br></br>
        <h2 style={{color:"white"}}><u>Your Current Todos</u></h2><br></br>
        {todos.length==0 ? (<p>Nothing yet</p>):(
            todos.map((todo,index)=>{
                return <div style={{border:"1px solid white", borderRadius:"5px"}}>
                    <div key={index} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "10px", // adds spacing between todos
                        padding: "10px", // adds some padding
                    }}>
                        <div style={{
                            display: "flex", 
                            flexDirection: "column", // separates Title and Description vertically
                        }}>
                            <h3 style={{margin: 0,color:"white"}}>{todo.Title}</h3>
                            <h4 style={{margin: 0, color: "grey"}}>{todo.Description}</h4> 
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <img src={trashIcon} width="40" color="red" style={{cursor: "pointer", marginRight: "10px", marginLeft:"100px"}}
                            onClick={() => {deleteTodo(todo)}}/>
                            <button className="button" style={{
                                backgroundColor: todo.Completed ? "#4CAF50" : "#ddd",
                                color: todo.Completed ? "#fff" : "#000",
                            }} onClick={() => {updateTodo(todo)}}>
                                {todo.Completed ? "Completed" : "Mark as Done"}
                            </button>
                        </div>
                    </div>
                </div>
            })
        )}
    </div>
}