import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/question/question';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            values:[
                {
                    question: '¿Cuál es el río más largo del mundo?',
                    options: [ 'Misisipi', 'Amazonas', 'Nilo', 'Ninguno de los anteriores' ],
                    type: '2',
                },{
                    question: 'Las tres ciudades más grandes y pobladas del país son:',
                    options: [ 'Ciudad de México', 'Guadalajara ', 'Monterrey', 'Cancún' ],
                    type: '1',
                },{
                    question: '¿Qué nombre científico recibe el detector de mentiras?',
                    type: '3',
                },
            ]
        }
    }
    render(){
        var questions = this.state.values.map(
            function iterator (value){
                return(
                    <Question
                        question={value.question}
                        options={value.options}
                        type={value.type}
                    />
                );
            }
        );
        return(
            <div>
                {questions}
            </div>
        );
    }
}

export default App;
