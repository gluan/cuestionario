import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './question.css';
import Checkbox from '../checkbox/checkbox';
import Radio from '../radio/radio';

class Question extends Component {
    constructor(props){
        super(props);
    }
	handleChangeAnswer= value =>{
		console.log('value');
		console.log(value.currentTarget.value);
		//this.propsanswer=value.currentTarget.value;
	}

    render() {
        var question;
        /*Si la pregunta es tipo 1 es opcion ckeckbox*/
        if(this.props.type == '1') {
            var checks = this.props.options.map(
                function iterator(option){
                    return (<Checkbox value={option} />);
                }
            );
            question =
                <div>
                    <div className="question">
						<img className="numero" src="/img/circulo.png" />
						<div className="div-num">{this.props.num}</div>
						{this.props.question}
					</div>
                    <div className="text">
						{checks}
					</div>
                </div>
        /* Pregunta tipo 2 - opcion multiple*/
        }else if (this.props.type == '2') {
            const r = Math.random().toString(36).substring(7);
            console.log("random", r);
            var radios = this.props.options.map(
                function iterator(option){
                    return(
                        <Radio
                            value={option}
                            name={r}
                        />
                    );
                }
            );
            question =
                <div>
                    <div className="question">
						<img className="numero" src="/img/circulo.png" />
						<div className="div-num">{this.props.num}</div>
						{this.props.question}
					</div>
                    <div className="text">
						{radios}
					</div>
                </div>
        /*Opcion 3 respuesta abierta*/
        }else {
            question =
                <div>
                    <div className="question">
						<img className="numero" src="/img/circulo.png" />
						<div className="div-num">{this.props.num}</div>
						{this.props.question}
					</div>
                    <div className="text">
                        <textarea 
							placeholder={this.props.placeholder} 
							className="respuesta" 
							value={this.props.answer}
							onChange={this.handleChangeAnswer}>
						</textarea>
                    </div>
                </div>
        }

        return(
            <div className="body-question">{question}</div>
        );
    }

}

export default Question;
