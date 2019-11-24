const mongoose = require('mongoose')

//note schema - to decide shape of document for our collection
const Schema = mongoose.Schema
const notesSchema = new Schema({
    title : {
        type:String,
        required:true
    },
    description : {
        type:String
    },
    // createdAt : {
    //     type : Date,
    //     default : Date.now
    // },
    category:{
        type: Schema.Types.Object,
        ref:'Category',
        required:true
    }
})

//note constructor function
const Note = mongoose.model('Notes',notesSchema)

module.exports = Note