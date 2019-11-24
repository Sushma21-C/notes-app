const mongoose = require('mongoose')

//db configuration
mongoose.Promise = global.Promise //telling mongoose library to use es6 promise library to handle asyn behaviour

//mongo db protocol,where db is running,db name (typically project name) || method that establishes to db if db is running, this returns a promise

const configureDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/notes-app-july',{useNewUrlParser:true}) 
    .then(()=>{
        console.log("successfully connected to db")
    })
    .catch((err)=>{
        console.log('error connecting to db',err)
    })
}

module.exports = configureDB

// const mongoose = require('mongoose')

// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/notes-app', { useNewUrlParser: true})
//     .then(function(){
//         console.log('connected to db')
//     })
//     .catch(function(){
//         console.log('error connecting to db')
//     })

// module.exports = {
//     mongoose 
// }

