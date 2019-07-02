import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './checkbox.css';

class Checkbox extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <label>
                <input type="checkbox" />{this.props.name}
            </label>
        );
    }
}

export default Checkbox;
