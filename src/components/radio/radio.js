import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './radio.css';

class Radio extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <label>
                <input type="radio"
                    value={this.props.value}
                    name={this.props.name}
                />{this.props.value}
            </label>
        );
    }
}

export default Radio;
