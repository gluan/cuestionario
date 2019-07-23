import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './instructions.css';

class Instructions extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="row">
                <img className="title_image" src={"/img/avatar.png"} alt="background_avatar"/>
                <img className="title_instructions" src={"/img/fondo-instrucciones.png"} alt="background_instrucciones"/>
                <div className="text_instructions">
                    <div className="title">{this.props.title}:</div>
					<div>{this.props.text}</div>
                </div>
            </div>
        );
    }

}

export default Instructions;
