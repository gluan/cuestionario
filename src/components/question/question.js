import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './question.css';
import Checkbox from '../checkbox/checkbox';
import Radio from '../radio/radio';

class Question extends Component {
    constructor(props){
        super(props);
    }

    render() {
        var question;
        /*Si la pregunta es tipo 1 es opcion ckeckbox*/
        if(this.props.type == '1') {
            var checks = this.props.options.map(
                function iterator(option){
                    return (<Checkbox name={option} />);
                }
            );
            question =
                <div>
                    <div> {this.props.question} </div>
                    <div> {checks} </div>
                </div>
        /* Pregunta tipo 2 - opcion multiple*/
        }else if (this.props.type == '2') {
            var radios = this.props.options.map(
                function iterator(option){
                    return(
                        <Radio
                            value={option}
                            name="question-1"
                        />
                    );
                }
            );
            question =
                <div>
                    <div>{this.props.question}</div>
                    <div>{radios}</div>
                </div>
        /*Opcion 3 respuesta abierta*/
        }else {
            question =
                <div>
                    <div>{this.props.question}</div>
                    <textarea></textarea>
                </div>
        }

        return(
            <div>{question}</div>
        );
    }

}

export default Question;
