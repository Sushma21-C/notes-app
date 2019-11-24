import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'


class CategoryShow extends React.Component{
    constructor(){
        super()
        this.state={
            category: {}
        }
    }

    handleRemove =()=>{
        const id = this.props.match.params.id
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove){
            axios.delete(`http://localhost:3012/category/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response.data)
            this.props.history.push('/category')
            })
        }
        
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`http://localhost:3012/category/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const category = response.data
            console.log(category)
            this.setState({category})
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
                <h3>category Show Page</h3>
                <p>{this.state.category.name}</p>
                
                
                <Link to={`/category/edit/${id}`}>Edit</Link> |
                <button onClick={this.handleRemove}>Delete </button>
                <Link to="/category">back</Link>
                
            </div>
        )
    }
}

export default CategoryShow