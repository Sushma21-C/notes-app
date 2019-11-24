import React from 'react';

class CategoryForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(e){
        //console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit(e){
       e.preventDefault()
       const formData={
           name:this.state.name
       }
       console.log(formData)
       this.props.handleSubmit(formData)
    }
    render(){
        return(
            <div>
                <h1>Add Category</h1>
                <form onSubmit={this.handleSubmit}>
                  <label>name 
                      <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
                      </label><br/>
                  <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default CategoryForm