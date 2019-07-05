import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './checkbox.css';

class Checkbox extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
			<div>
				<input type="checkbox"
					id={this.props.value}
					value={this.props.value}
				/>
				<label for={this.props.value} class="check"></label>
				{this.props.value}
			</div>
        );
    }
}

export default Checkbox;
