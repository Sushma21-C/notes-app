const Category = require('../models/category')
const Note = require('../models/note')

//list
module.exports.list=(req,res)=>{
    Category.find().sort({"name":1})
    .then((categories)=>{
        res.json(categories)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//create
module.exports.create=(req,res)=>{
    const body = req.body
    const category = new Category(body)
    category.save()
    .then((category)=>{
        res.json(category)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//show
module.exports.show=(req,res)=>{
    const id=req.params.id

    Promise.all([Category.findById(id),Note.find({categoryId:id})])
        .then(values=>{
            const [category,notes]=values
            const newCategory = {
                "._id":category._id,
                "name":category.name,
                notes
            }
            res.json(newCategory)
        })
        .catch(err=>{
            res.json(err)
        })
}

//update
module.exports.update=(req,res)=>{
    const {body}=req
    const {id}=req.params
    Category.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((category)=>{
        if(category) {
            res.json(category)
        } else {
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}

//destroy
module.exports.destroy=(req,res)=>{
    const {id}=req.params
    Category.findByIdAndDelete(id)
    .then((category)=>{
        if(category)
            res.json(category)
        else
            res.json({})
    })
    .catch((err)=>{
        res.json(err)
    })
}