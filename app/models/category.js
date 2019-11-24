//import mongoose to get Schema object
const mongoose = require('mongoose')

//create a schema
const Schema = mongoose.Schema
const categorySchema = new Schema({
    name: {
        type:String,
        required:true
    },

})

//create a model
const Category = mongoose.model('Category',categorySchema)

//export model
module.exports = Category