import React from 'react';
import axios from 'axios';
import SignUp from './signup';
import { Link,Redirect } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : ""
        }
        this.handeSubmit = this.handeSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    

    handleChange = (event) => {
        console.log('--event--',event);
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value});

        console.log('--name--',name);
        console.log('--value--',value);
        
    }
    

     handeSubmit = (e) => {
        e.preventDefault();

        const email = this.state.email;
        const password = this.state.password;

        var LoginFormData = {
            email : email,
            password : password
        }

        axios.post('http://localhost:8081/login',LoginFormData)
        .then(function (response) {
            this.setState({message:'success'});
        })
        .catch(function (error) {
            console.log(error);
        })
        
    } 
    state = {
        redirect: false
    }

    setRedirect = () =>{
        this.setState({
            redirect : true
        })
    }
    renderRedirect = () => {
        if(this.state.redirect){
            return <Redirect to='/signup'/>
        }
    }
    
    render(){
        return (
            <div className="container" >
            <form >
    <h2>Log-In</h2>
   <h1>{this.state.message}</h1>
  
    <div className="mb-3">
      <label  className="form-label">Email address</label>
      <input type="text" className="form-control" name="email" placeholder="Enter Email" onChange={(e)=>this.handleChange(e)}/>
    </div>
    <div className="mb-3">
      <label  className="form-label">Password</label>
      <input type="password" className="form-control" name= "password" placeholder="Enter Password" onChange={(e)=>this.handleChange(e)}/>
    </div>

    <button  className="btn btn-primary" name="submit" onSubmit={(e)=>this.handeSubmit(e)}>Log In</button>
    <div>
    {this.renderRedirect()}
    <button  className="btn btn-primary" name="redirect" onClick={this.setRedirect}>Create Account</button>
    </div>
  </form>
        </div>
        )
    }
}

export default Login;