const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectID = Schema.ObjectId;

const User = new Schema({
    user : String,
    email : String,
    password : String
})

const todo =  new Schema({
    title : String,
    done : Boolean,
    userId : objectID
})

const UserModel = mongoose.model('users' , User); // users->mongodb , User - schema
const TodoModel = mongoose.model('todos' , todo);

module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
}