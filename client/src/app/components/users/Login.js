import React from 'react'
import axios from '../../config/axios'


class Login extends React.Component{
    constructor(){
        super()
        this.state={
           email:'',
           password:''
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value})
        }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }

        axios.post('/users/login',formData)
        .then(response=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                const token = response.data.token
                console.log(token)
                localStorage.setItem('authToken',token)
                this.props.history.push('/')
                window.location.reload()
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
    render(){
        return(
            <div className="container">
                <h2>Login Page</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="text" 
                                name="email" 
                                value={this.state.email} 
                                onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                       <label>password</label>
                        <input type="password" 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.handleChange}
                        />
                    </div>
                        
                    <input type="submit" className="btn btn-primary"/>
                </form>
            </div>
        )
    }     

}
export default Login
