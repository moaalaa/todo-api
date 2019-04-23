const mongoose = require('mongoose');

// Use Promises As Default
mongoose.Promise = global.Promise; 

// Connect To Mongo
mongoose.connect('mongodb://127.0.0.1:27017/TodoApp', {useNewUrlParser: true});

let schema = new mongoose.Schema({
    name: 'string',
    completed: 'boolean',
    completedAt: 'number'
});

let Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    },
});


let newTodo = new Todo({
    text: "Watch Node js Course",
    completed: true,
    completedAt: new Date()
});

newTodo.save()
    .then((doc) => console.log('Saved Todo', doc))
    .catch(e => console.log('error', e));

