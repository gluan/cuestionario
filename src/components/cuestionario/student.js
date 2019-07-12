import React, {Component} from 'react';
//import Question from '../question/question';
import Instructions from '../instructions/instructions';
import './cuestionario.css';
import Checkbox from '../checkbox/checkbox';
import Radio from '../radio/radio';

class Student extends Component {
    constructor(props){
        super(props);
		this.instrucciones={
			title: 'Instrucciones',
			text: 'Responde el cuestionario selecionando la respuesta correcta en las preguntas de opcion multiple,'+
			'selecionanado las respuestas correctas en las preguntas de sellecion y escribiendo la respuesta en las preguntas abiertas'
		};
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
			var values = this.state.values;
			values[value.currentTarget.id.split('-')[1]].answer=value.currentTarget.value;
			this.setState({values:values});
		}
		this.handleClickTerminar = value => {
			console.log('terminar');
			console.log(this.state);
		}
    }
	
	
    render(){
		var handleChangeQuestion=this.handleChangeQuestion;
		var handleChangeAnswer=this.handleChangeAnswer;
        var questions = this.state.values.map(
            function iterator (value, i){
				var questionBody;
				
				/*Si la pregunta es tipo 1 es opcion ckeckbox*/
				if(value.type == '1') {
					var checks = value.options.map(
						function iterator(option){
							return (<Checkbox value={option} />);
						}
					);
					questionBody =
						<div className="text">
							{checks}
						</div>
				
				/* Pregunta tipo 2 - opcion multiple*/
				}else if (value.type == '2') {
					const r = Math.random().toString(36).substring(7);
					console.log("random", r);
					var radios = value.options.map(
						function iterator(option){
							return(
								<Radio
									value={option}
									name={r}
								/>
							);
						}
					);
					questionBody =
						<div className="text">
							{radios}
						</div>
				
				/*Opcion 3 respuesta abierta*/
				}else {
					questionBody =
						<div className="text">
							<textarea 
								id={'question-'+i}
								placeholder={value.placeholder} 
								className="respuesta" 
								value={value.answer}
								onChange={handleChangeQuestion}>
							</textarea>
						</div>
				}

                return(
					<div className="body-question">
						<div>
							<div className="question">
								<img className="numero" src="/img/circulo.png" />
								<div className="div-num">{i}</div>
								{value.question}
							</div>
							{questionBody}
						</div>
					</div>
                );
            }
        );
        return(
            <div className="body-cuestionario">
				<div className="row col-12">
					<Instructions title={this.instrucciones.title} text={this.instrucciones.text} />
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
