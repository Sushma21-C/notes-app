import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

class NotesShow extends React.Component{
    constructor(){
        super()
        this.state={
            notes: {}
        }
    }

    handleRemove =()=>{
        const id = this.props.match.params.id
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove){
            axios.delete(`http://localhost:3012/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response.data)
            this.props.history.push('/notes')
            })
        }
        
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`http://localhost:3012/notes/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const note = response.data
            console.log(note)
            this.setState({note})
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        //console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        return(
            <div>
                <h3>notes Show Page</h3>
                <p>{this.state.notes.title},
                {this.state.notes.description},
                {this.state.notes.category}</p>
                
                <Link to={`/notes/edit/${id}`}>Edit</Link> |
                <button onClick={this.handleRemove}>Delete </button>
                <Link to="/notes">back</Link>
                
            </div>
        )
    }
}

export default NotesShow