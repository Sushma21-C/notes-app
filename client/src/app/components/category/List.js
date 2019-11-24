import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

//import NotesForm from '/notes/From'
import CategoryForm from '../notes/Form'

class CategoryList extends React.Component{
    constructor(){
        super()
        this.state={
            categories:[]
        }
        // console.log("constructor")
    }

    componentDidMount(){
        //console.log("comp")
        axios.get('/categories',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            //console.log(response)
            const categories=response.data
            this.setState({categories})
        })
        .catch(err=>{
           alert(err)
        })
    }
    handleSubmit = (formData)=>{
        console.log("formdata", formData)
        axios.post('/categories',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            const category = response.data
            console.log(response.data)
            this.setState(prevState=>({
                categories: prevState.categories.concat(category)
            }))
        })
        .catch(err=>{
            alert(err)
        })
    }
    handleRemove=(id)=>{
        const confirmRemove=window.confirm("Are you sure?")
        if(confirmRemove){
            axios.delete(`/categories/${id}`,{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response =>{
                console.log(response.data)
                this.setState(prevState=>({
                    categories:prevState.categories.filter(category=>
                        category._id != response.data._id)
                }))
            })
        }
    }
    render(){
        // console.log("render")
        return(
            <div>
              <h2>Listing categories - {this.state.categories.length}</h2>
                <ul>
                {this.state.categories.map(category=>{
                    return(<li key={category._id}><Link to={`/categories/show/${category._id}`}>{category.name}</Link>
                    <button onClick={()=>{this.handleRemove(category._id)}}>remove</button>
                    </li>)
                })}
                </ul>
                <div>
                    <CategoryForm handleSubmit={this.handleSubmit}/>
                </div>
            </div>
        )
    }
}
export default CategoryList
