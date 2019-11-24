import React from 'react'
import axios from './app/config/axios'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Home from './app/components/Home'
import Login from './app/components/users/Login'
import Register from './app/components/users/Register'

import CategoryList from './app/components/category/List'
import CategoryForm from './app/components/category/Form'
import CategoryShow from './app/components/category/Show'

import NotesList from './app/components/notes/List'
import NotesForm from './app/components/notes/Form'
import NotesEdit from './app/components/notes/Edit'
import NotesShow from './app/components/notes/Show'

function App(){
    function handleClick(){
        // console.log('clicked')
        axios.delete('/users/logout',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response)
            alert(response.data.notice)
            localStorage.removeItem('authToken')
            window.location.reload()
            window.location.href="/"
        })
    }
    return(
        <BrowserRouter>
        <div className="container">
            <h1>Notes App</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                {
                    localStorage.getItem('authToken') ? (
                        <div>
                            <li><Link to="/category">Category</Link></li>
                            <li><Link to="/notes">Notes</Link></li>
                            <li><Link to="#" onClick={handleClick}>Logout</Link></li>
                        </div>
                    ) : (
                        <div>
                            <li><Link to="/users/login">login</Link></li>
                            <li><Link to="/users/register">register</Link></li>
                        </div>
                    )
                }
                
            </ul>

            
            <Route path="/" component={Home}/>
            <Route path="/users/register" component={Register} />
            <Route path="/users/login" component={Login} />
            <Route path="/category" component={CategoryList}/>
            <Route path="/category/form" component={CategoryForm} exact={true}/>
            <Route path="/category/show/:id" component={CategoryShow}/>

            <Route path="/notes" component={NotesList} exact={true}/>
            <Route path="/notes/form" component={NotesForm} exact={true}/>
            <Route path="/notes/edit/id" component={NotesEdit}/>
            <Route path="/notes/show/:id" component={NotesShow}/>
        </div>  
        </BrowserRouter>  
    )
}

export default App;