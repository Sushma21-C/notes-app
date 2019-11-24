import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

//import NotesForm from '/notes/From'
import NotesForm from '../notes/Form'

class NotesList extends React.Component{
    constructor(){
        super()
        this.state={
            notes:[]
        }
        // console.log("constructor")
    }

    componentDidMount(){
        //console.log("comp")
        axios.get('/notes',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            //console.log(response)
            const notes=response.data
            this.setState({notes})
        })
        .catch(err=>{
           alert(err)
        })
    }
    handleSubmit = (formData)=>{
        console.log("formdata", formData)
        axios.post('/notes',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            const note = response.data
            console.log(response.data)
            this.setState(prevState=>({
                notes: prevState.notes.concat(note)
            }))
        })
        .catch(err=>{
            alert(err)
        })
    }
    handleRemove=(id)=>{
        const confirmRemove=window.confirm("Are you sure?")
        if(confirmRemove){
            axios.delete(`/notes/${id}`,{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response =>{
                console.log(response.data)
                this.setState(prevState=>({
                    notes:prevState.notes.filter(note=>
                        note._id != response.data._id)
                }))
            })
        }
    }
    render(){
        // console.log("render")
        return(
            <div>
              <h2>Listing notes - {this.state.notes.length}</h2>
                <ul>
                {this.state.notes.map(note=>{
                    return(<li key={note._id}><Link to={`/notes/show/${note._id}`}>{note.title}</Link>
                    <button onClick={()=>{this.handleRemove(note._id)}}>remove</button>
                    </li>)
                })}
                </ul>
                <div>
                    <NotesForm handleSubmit={this.handleSubmit}/>
                </div>
            </div>
        )
    }
}
export default NotesList
