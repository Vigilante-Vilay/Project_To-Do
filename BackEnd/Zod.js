const zod = require("zod");

const addTodo = zod.object({
    title: zod.string(),
    description : zod.string()
})

const updateTodo = zod.object({
    title: zod.string()
})

const deleteTodo = zod.object({
    title: zod.string()
})

module.exports = {
    addTodo,
    updateTodo,
    deleteTodo
}