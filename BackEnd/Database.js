const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Vilay123:Hungryvilay@cluster0.nfg6fbr.mongodb.net/Project-ToDo");

const todoSchema = new mongoose.Schema({
    Title: {type:String, required:true},
    Description: {type:String, required:true},
    Completed: {type:Boolean, default:false},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"Users", required:true} //Reference to the user
})

const userSchema = new mongoose.Schema({
    Username: {type:String, required:true, unique:true},
    Password: {type:String, required:true},
    Todos: {type:mongoose.Schema.Types.ObjectId, ref:"Todos"} //Array of Todo ObjectId's 
})

const Todo = mongoose.model("Todos",todoSchema);
const User = mongoose.model("Users",userSchema);

module.exports = {
    Todo,
    User
}