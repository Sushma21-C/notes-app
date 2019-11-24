const User = require('../models/user')
const _=require('lodash')// npm install --save lodash

//register
module.exports.register = (req, res)=>{
    //serialize request objects/inputs
    const body =_.pick(req.body,['username','email','password'])
    const user = new User(body)
    user.save()
        .then(user=>{
            //res.json(user)
            //res.json({ _id: user._id, email: user.email, username: user.username})
            res.json(_.pick(user,['id','username','email']))
        })
        .catch(err=>{
            res.json(err)
        })
}



//login
module.exports.login = (req, res)=>{
    const body =_.pick(req.body,['email','password'])
    User.findByCredentials(body.email, body.password)
        .then(user=>{
            user.generateToken()
                .then(token=>{
                    // res.setHeader('x-auth', token).send('Login done successfully')
                    res.send(token)
                })
                .catch(err=>{
                    res.json(err)
                })
        })
        .catch(err=>{
            res.json(err)
        })
}

//account
module.exports.account = (req, res)=>{
    // res.send(req.user)
    const {user} = req
   // res.json({ _id: user._id, email: user.email, username: user.username})
   res.json(_.pick(user,['id','username','email']))
}


//logout
module.exports.logout =(req, res)=>{
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {'$pull':{'tokens':{'token':token}}})
        .then(()=>{
            res.json('successfully logged out')
        })
        .catch(err=>{
            res.json(err)
        })
}

// //logoutAll
// module.exports.destroyAll =(req, res)=>{
//     const {user} = req
//     User.findByIdAndUpdate(user._id, {'$set':{'tokens':[]}})
//         .then(()=>{
//             res.json('logged out all the devices')
//         })
//         .catch(err=>{
//             res.json(err)
//         })
// }