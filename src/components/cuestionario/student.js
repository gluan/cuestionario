import React, {Component} from 'react';
import Question from '../question/question';
import Instructions from '../instructions/instructions';
import './cuestionario.css';

class Student extends Component {
    constructor(props){
        super(props);
        this.state={
            values:[
                {
                    question: '¿Cuál es el río más largo del mundo?',
                    options: [ 'Misisipi', 'Amazonas', 'Nilo' ],
                    type: '2',
                }
                ,{
                    question: 'Las tres ciudades más grandes y pobladas del país son:',
                    options: [ 'Ciudad de México', 'Guadalajara ', 'Monterrey', 'Cancún' ],
                    type: '1',
                },{
                    question: '¿Qué nombre científico recibe el detector de mentiras?',
                    type: '3',
					placeholder: 'Escribe tu respuesta',
                }/*,{
                    question: '¿Cuál es el río más largo del mundo?',
                    options: [ 'Misisipi', 'Amazonas', 'Nilo', 'Ninguno de los anteriores' ],
                    type: '2',
                },{
                    question: '¿Cuál es el río más largo del mundo?',
                    options: [ 'Misisipi', 'Amazonas', 'Nilo', 'Ninguno de los anteriores' ],
                    type: '2',
                },{
                    question: '¿Cuál es el río más largo del mundo?',
                    options: [ 'Misisipi', 'Amazonas', 'Nilo', 'Ninguno de los anteriores' ],
                    type: '2',
                },*/
            ]
        };
		this.handleChangeQuestion = value =>{
			console.log('Cambio en question');
			console.log(value);
			console.log(value.currentTarget);
		}
    }
	handleClickTerminar(){
		console.log('terminar');
		console.log(this.props);
	}
	
    render(){
		var handleChangeQuestion=this.handleChangeQuestion;
        var questions = this.state.values.map(
            function iterator (value, i){
                return(
                    <Question
						onChange={handleChangeQuestion}
						placeholder={value.placeholder}
                        question={value.question}
                        options={value.options}
                        type={value.type}
						num={i+1}
                    />
                );
            }
        );
		var instrucciones={
			title: 'Instrucciones',
			text: 'Responde el cuestionario selecionando la respuesta correcta en las preguntas de opcion multiple,'+
			'selecionanado las respuestas correctas en las preguntas de sellecion y escribiendo la respuesta en las preguntas abiertas'
		}
        return(
            <div className="body-cuestionario">
				<div className="row col-12">
					<Instructions title={instrucciones.title} text={instrucciones.text} />
				</div>
				<div className="row col-12 cuestionario">
                    <div className="force-overflow">
    					{questions}
                    </div>
				</div>
                <div className="div-btn">
                    <button onClick={this.handleClickTerminar} className="button-terminar-ejercicio">Terminar</button>
                </div>
            </div>
        );
    }
}

export default Student;
