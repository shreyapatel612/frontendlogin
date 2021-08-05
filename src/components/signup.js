import React from 'react';
import Select from 'react-select';
import axios from 'axios';

class SignUp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name      : "",
      email     : "",
      password  : "",
      roles: [],
      roleid : "",
      rolename      : "",
      nameError     : false,
      emailError     : false,
      passowrdError     : false,
      roleError     : false,
      message   : ''

    }
    this.validateForm = this.validateForm.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }
  componentDidMount(){
    fetch('http://localhost:8081/roles')
      .then(res =>res.json())
      .then(res => this.setState({
        roles: res.Data
      }))
      .catch(error => console.log(error));
  }
  

  // async getOptions(){
  //   const res = await axios.get('http://localhost:8081/roles')
  //   const data = res.data

  //   const options = data.map(d => ({
  //     "value" : d.id,
  //     "label" : d.rolename
  //   }))
  //   this.setState({SelectOptions : options});
  // }
  
  validateForm() {
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    const rolename = this.state.rolename;

    if(name){
      this.setState({nameError:false});
    }
    else{
      this.setState({nameError:true});
    }
    if(email){
      this.setState({emailError:false});
    }
    else{
      this.setState({emailError:true});
    }
    if(password){
      this.setState({passwordError:false});
    }
    else{
      this.setState({passwordError:true});
    }
    if(rolename){
      this.setState({roleError:false});
    }
    else{
      this.setState({roleError:true});
    }

    //constructing form data
    var signUpFormData = {
      name      : name,
      email     : email,
      password  : password,
      rolename  : rolename
    }

    console.log('-=-=-signUpFormData-=-=',signUpFormData);

    //post Data to server
    axios.post('http://localhost:8081/signup',signUpFormData)
    .then(function (response) {
      this.setState({message :'success'})
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
 
  onChangeInput(event){
    console.log('---event---',event);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name] : value})

    console.log('0----name---',name);
    console.log('0----value---',value);
  }

    render(){
      let option = []
      if(this.state.values >0){
        this.state.values.forEach(role =>{
          let roleDate = {}
          roleDate.value = role.roleid
          roleDate.label = role.rolename
          option.push(roleDate)
        })
      }
      
        return(
            <div className="container" >
      <form>
        <h2>Sign-Up</h2>
       <h1>{this.state.message}</h1>
      <div className="mb-3">
          <label  className="form-label">Name</label>
          <input type="name" className="form-control" style={{'border':(this.state.nameError)?"1px solid red":''}} value={this.state.name} placeholder="Enter Name *" id="name" name="name" onChange={(e)=>this.onChangeInput(e)} />
        </div>
        <div className="mb-3">
          <label  className="form-label">Email address</label>
          <input type="text" className="form-control" style={{'border':(this.state.emailError)?"1px solid red":''}} placeholder="Enter Email *" id="email" name="email" onChange={(e)=>this.onChangeInput(e)} />
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input type="password" className="form-control" style={{'border':(this.state.passwordError)?"1px solid red":''}} placeholder="Enter Passowrd *"  id="password" name="password" onChange={(e)=>this.onChangeInput(e)} />
        </div>
        <div className="mb-3">
      <label  className="form-label">select menu</label>
      <Select options={option}> </Select>
    </div>

        <input type="submit" className="btn btn-primary" value="SignUp" onClick={this.validateForm}  />
      </form>       
    </div>
        )
    }
}

export default SignUp;