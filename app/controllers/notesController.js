const Note = require('../models/note')
const Category = require('../models/category')

//list
module.exports.list=(req,res)=>{
    Note.find().sort({"createdAt":1}).populate('categoryId')
    .then((notes)=>{
        res.json(notes)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//create
module.exports.create=(req,res)=>{
    const body = req.body
    const note = new Note(body)
    note.save()
      .then((note)=>{
          res.json(note)
      })
      .catch((err)=>{
          res.json(err)
      })
}

//show
module.exports.show=(req,res)=>{
    const id = req.params.id
    // Note.findById(id).populate('categoryId',['name'])
    Note.findById(id)
    .then((note)=>{
        if(note){
            //res.json(note)
            const categId=note.categoryId
            Category.findById(categId)
                .then((category)=>{
                    const newNote = Object.assign({},note.toObject())
                    if(category){
                        newNote.categoryId=category
                        res.json(newNote)
                    }
                    res.json(newNote)
                })
                .catch(err=>{
                    res.json(err)
                })
        } else {
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}

//update
module.exports.update=(req,res)=>{
    const {id}=req.params
    const {body}=req.body
    Note.findByIdAndUpdate(id,body,{new:true,runValidators:true})
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

module.exports.destroy=(req,res)=>{
    const {id}=req.params
    Note.findByIdAndDelete(id)
    .then((note)=>{
        if(note)
        res.json(note)
        else
        res.json({})
    })
    .catch((err)=>{
        res.json(err)
    })
}
