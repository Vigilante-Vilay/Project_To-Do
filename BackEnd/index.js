const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors");
const {addTodo,updateTodo,deleteTodo} = require("./Zod")
const {Todo,User} = require("./Database")
const authenticateToken = require("./Middleware");
const jwtPassword = "123456";

const app = express();
app.use(cors({
    origin: ["https://project-to-do-nzoz.vercel.app"],
    methods: ["POST","GET","PUT","DELETE"],
    credentials: true // Allow cookies for authenticated requests (if applicable)
  }));
app.use(express.json());

app.post("/signup",async (req,res)=>{
    const{username,password} = req.body;
    try{
        if(!username || !password){
            return res.status(400).json({
                error:"Username and Password are required"
            })
        }
        const existingUser = await User.findOne({Username: username});
        if(existingUser){
            return res.status(409).json({
                error:"Username already taken"
            })
        }
        await User.create({
            Username: username,
            Password: password
        })
        res.json({
            msg: "User successfully created"
        })
    }catch(err){
        return res.status(500).json({
            error: "Error in creating user"
        })
    }

})

app.post("/login",async (req,res)=>{
    const{username,password} = req.body;
    try{
        if(!username || !password){
            return res.status(400).json({
                error: "Username and password are required"
            })
        }
        const user = await User.findOne({Username: username});
        if(!user){
            return res.status(400).json({
                error: "No such user found"
            })
        }
        if(user.Password != password){
            return res.status(400).json({
                error: "Username or password incorrect"
            })
        }

        const token = jwt.sign({userId:user._id},jwtPassword,{expiresIn:"30m"}); //The token becomes invalid after 30 mins

        return res.json({
            msg: "Login Successful",
            token
        })
    }catch(err){
        return res.status(500).json({
            error: "Some error occured"
        })
    }
})

//Old Endpoints
//This endpoint logs your current list of todos
app.get("/Todos",authenticateToken,async (req,res)=>{
    const todos = await Todo.find({userId: req.user.userId});
    return res.json({
        todos
    })
})

//This endpoint lets you add another todo
app.post("/AddTodo",authenticateToken,async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const payLoad = {
        title,
        description
    }
    const parsedPayLoad = addTodo.safeParse(payLoad)
    if(!parsedPayLoad.success){
        res.status(400).json({
            msg: "Invalid Inputs"
        })
        return;
    }
    await Todo.create({
        Title: title,
        Description: description,
        userId: req.user.userId
    }).then((newTodo)=>{
        res.json({
            msg:"Todo Added",
            todo: newTodo
        })
    })
})

//This endpoint lets you update your todo
app.put("/UpdateTodo",authenticateToken,async (req,res)=>{
    const title = req.body.title;
    const payLoad = {
        title
    }
    const parsedPayLoad = updateTodo.safeParse(payLoad);
    if(!parsedPayLoad.success){
        res.status(400).json({
            msg : "Invalid Title"
        })
        return;
    }
    await Todo.updateOne({Title:title},{$set:{Completed:true}});
    res.json({
        msg:"Todo Updated"
    })
})

//This endpoint lets you delete a todo
app.delete("/DeleteTodo",authenticateToken,async (req,res)=>{
    const title = req.body.title;
    const payLoad = {
        title
    }
    const parsedPayLoad = deleteTodo.safeParse(payLoad);
    if(!parsedPayLoad.success){
        res.status(400).json({
            msg : "Invalid Title"
        })
        return;
    }
    await Todo.deleteOne({Title:title});
    res.json({
        msg:"Todo Deleted"
    })
})

app.listen(5000,()=>{
    console.log("Server Running")
});