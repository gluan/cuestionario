import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './radio.css';

class Radio extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
			<div>				
				<input type="radio"
					id={this.props.value}
					value={this.props.value}
                    name={this.props.name} />
				<label for={this.props.value} class="radio"></label>
				{this.props.value}
			</div>
        );
    }
}

export default Radio;
