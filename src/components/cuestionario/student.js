import React, {Component} from 'react';
//import Question from '../question/question';
import Instructions from '../instructions/instructions';
import './cuestionario.css';
//import Checkbox from '../checkbox/checkbox';
//import Radio from '../radio/radio';

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
                },{
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
                }
            ]
        };
		/*Cambios pregunta abierta*/
		this.handleChangeQuestion = value =>{
			var values = this.state.values;
			values[value.currentTarget.id.split('-')[1]].answer=value.currentTarget.value;
			this.setState({values:values});
		}
		/*Terminar formulario*/
		this.handleClickTerminar = value => {
			console.log('terminar');
			console.log(this.state);
		}
		/*Cambio radio*/
		this.handleChangeRadio = value => {
            var i =value.currentTarget.name.split('-')[1];
            var j =value.currentTarget.name.split('-')[2];
            var values=this.state.values;
            values[i].answer = value.currentTarget.value;
			values[i].answerOptions = j;
            this.setState({values:values});
        }
		/*Cambio en checkbox*/
		this.handleChangeCheckbox = value => {
			var values = this.state.values;
			var i = value.currentTarget.id.split('-')[1];
			var j = value.currentTarget.id.split('-')[2];
			values[i].options[j].checked=!values[i].options[j].checked;
			this.setState({values:values});
		}
    }

	componentDidMount(){
		var values = this.state.values.map(
			function iterator(value, i){
				var question = value;
				if(value.type == '1') {
					var opciones = value.options.map(
						function iterator(option, j){
							return(
								{
									value: option,
									checked:false,
								}
							);
						}
					)
					question.options = opciones;
				}
				return(question);
			}
		);
		this.setState({values:values});
	}

    render(){
		var handleChangeQuestion=this.handleChangeQuestion;
		var handleChangeAnswer=this.handleChangeAnswer;
		var handleChangeRadio=this.handleChangeRadio;
		var handleChangeCheckbox=this.handleChangeCheckbox;

        var questions = this.state.values.map(
            function iterator (value, i){
				var questionBody;

				/*Si la pregunta es tipo 1 es opcion ckeckbox*/
				if(value.type == '1') {
					var checks = value.options.map(
						function iterator(option, j){
							return (
								<div>
									<input type="checkbox"
										id={'c-'+i+'-'+j}
										value={option.value}
										checked={option.checked}
										onChange={handleChangeCheckbox}
									/>
									<label htmlFor={'c-'+i+'-'+j} className="check"></label>
									{option.value}
								</div>
							);
						}
					);
					questionBody =
						<div className="text">
							{checks}
						</div>

				/* Pregunta tipo 2 - opcion multiple*/
				}else if (value.type == '2') {
					const r = Math.random().toString(36).substring(7);
					var radios = value.options.map(
						function iterator(option, j){
							return(
								<div>
									<input type="radio"
										onChange={handleChangeRadio}
										id={option + r}
										value={option}
										name={r + '-' + i} />
									<label htmlFor={option+r} className="radio"></label>
									{option}
								</div>
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
								<div className="div-num">{i+1}</div>
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
				<div className="row col-12 instrucciones">
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
