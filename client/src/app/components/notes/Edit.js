import React from 'react';
import axios from '../../config/axios';
import NotesForm from './Form'

class NotesEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            note:{}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            const note = response.data
            this.setState({note})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleSubmit(formData){
        const id = this.props.match.params.id
        axios.put(`/notes/${id}`,formData, {
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response =>{
                if(response.data.hasOwnProperty('error')){
                    alert(response.data.message)
                }else{
                    this.props.history.push(`/notes/${response.data._id}`)
                }
            })
            .catch(err =>{
                console.log(err)
            })
        }        
    render(){
        return(
            <div>
                <h2>Notes Edit</h2> 
                {(Object.keys(this.state.note).length !== 0) && 
                <NotesForm note={this.state.note} 
                handleSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}
export default NotesEdit