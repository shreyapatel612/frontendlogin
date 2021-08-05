import React, { Component } from 'react';
import Table from './components/Table';

class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:8081/users')
        .then(res => res.json())
        .then(json => json.users)
        .then(users => this.setState({'users' : users}))
    }

    render(){
        return (
            <div className="user">
                <Table users={this.state.users}/>
            </div>
        );
    }
}

export default User;