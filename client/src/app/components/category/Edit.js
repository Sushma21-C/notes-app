import React from 'react';
import axios from '../../config/axios';
import CategoryForm from './Form'

class CategoryEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            category:{}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/categories/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            const category = response.data
            this.setState({category})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleSubmit(formData){
        const id = this.props.match.params.id
        axios.put(`/categories/${id}`,formData, {
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response =>{
                if(response.data.hasOwnProperty('error')){
                    alert(response.data.message)
                }else{
                    this.props.history.push(`/categories/${response.data._id}`)
                }
            })
            .catch(err =>{
                console.log(err)
            })
        }        
    render(){
        return(
            <div>
                <h2>category Edit</h2> 
                {(Object.keys(this.state.category).length !== 0) && 
                <CategoryForm category={this.state.category} 
                handleSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}
export default CategoryEdit