import React from 'react';

class NotesForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title : props.notes ? props.notes.title:'',
            description : props.notes ? props.notes.description:'',
            category: props.notes ? props.notes.category:''
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
           title:this.state.title,
           description:this.state.description,
           category:this.state.category
       }
       console.log(formData)
       this.props.handleSubmit(formData)
    }
    render(){
        return(
            <div>
                <h1>Add notes</h1>
                <form onSubmit={this.handleSubmit}>
                  <label>Title 
                      <input type="text" value={this.state.title} onChange={this.handleChange} name="title"/>
                      </label><br/>
                  
                  <label>description 
                      <input type="text" value={this.state.description} onChange={this.handleChange} name="description"/>
                      </label><br/>
                  
                  <label>category 
                      <input type="text" value={this.state.category} onChange={this.handleChange} name="category"/>
                      </label><br/>
                  
                  <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default NotesForm