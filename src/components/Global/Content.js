// Dependencies
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './css/Content.css'

class Content extends Component{
    render() {
        const { body } = this.props;
        return(
            <div>
                { body }
            </div>
        );
    }
}

export default Content;
