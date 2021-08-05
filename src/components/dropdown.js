import axios from 'axios';
import React from 'react';


class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectOption : '',
            clearable : true,
            roles : [],
        }
    }
    

    handleChange(selectOption){
        this.setState({selectOption})
    }
    render(){
        let options = this.state.roles.map(function(role){
            return role.name;
        })
    return(
            <div>
                <select
                    name = "form-field-name"
                    value = {this.state.value}
                    onChange = {this.handleChange}
                    clearable = {this.state.clearable}
                    searchable = {this.state.searchable}
                    options = {options}
                ></select>
            </div>
        )
    }
}

export default DropDown;