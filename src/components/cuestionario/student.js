import React, {Component} from 'react';
import Instructions from '../instructions/instructions';
import './cuestionario.css';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";

class Student extends Component {
    constructor(props){
        super(props);
		this.instrucciones={
			title: 'Instrucciones',
			text: 'Responde el cuestionario selecionando la respuesta correcta en las preguntas de opcion multiple,'+
			'selecionando las respuestas correctas en las preguntas de seleccion y escribiendo la respuesta en las preguntas abiertas'
		};
        this.state={
            errors:{
                error:false,
                questions:[]
            },
            active:true,
            btn: true,
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
                },
                // {
                //     question: '¿Cuál es el río más largo del mundo?',
                //     options: [ 'Misisipi', 'Amazonas', 'Nilo' ],
                //     type: '2',
                // }
                // ,{
                //     question: 'Las tres ciudades más grandes y pobladas del país son:',
                //     options: [ 'Ciudad de México', 'Guadalajara ', 'Monterrey', 'Cancún' ],
                //     type: '1',
                // },{
                //     question: '¿Qué nombre científico recibe el detector de mentiras?',
                //     type: '3',
				// 	placeholder: 'Escribe tu respuesta',
                // },
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
            this.validate();
		}
		/*Cambio radio*/
		this.handleChangeRadio = value => {
            var i =value.currentTarget.id.split('-')[1];
            var j =value.currentTarget.id.split('-')[2];
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
        /*Descargar*/
        this.handleClickDescargar= value => {
            var today = new Date().toLocaleDateString();
            var instrucciones = this.instrucciones.text;
            console.log(today)
            var preguntas = this.state.values.map(
                function iterator(question, item) {
                    var respuestas = '';
                    if (question.type == '1'){
                        question.options.map((option) =>{
                            console.log('option  ' + option)
                            if(option.checked)
                                respuestas = respuestas +option.value +', '
                        })
                    }
    				return(
                        <div style={{margin:'10%'}}>
                            <h3>{item+1}{'. '+question.question}</h3>
                            <div>{question.answer ? question.answer : respuestas}</div>
                        </div>
                    )
            })
            const Prints = () => (
              <div>
                <div>
                    <div style={{textAling:'rigth'}}>{'Fecha:' + today}</div>
                </div>
                <div>
                    <h4>Programa:</h4>
                    <h4>Habilidad:</h4>
                    <h4>Lección:</h4>
                    <h4>Instrucciones: {instrucciones}</h4>
                </div>
                <div>
                    {preguntas}
                </div>
              </div>
            );
            // const print = () => {
              const string = renderToString(<Prints />);
              const pdf = new jsPDF("p", "mm", "a4");
              pdf.fromHTML(string);
              pdf.save("pdf");
            // };
            // print();
        }
    }

    validate(){
        let errors ={
            error:false,
            questions:[]
        }
        this.state.values.map( (value, item) => {
            if(value.type == '1') { // multiple
                let count = 0;
                value.options.map((option, item) => {
                    if (option.checked)
                        count++;
                })
                if (count > 0){
                    errors.questions.push(null)
                }else{
                    errors.error=true;
                    errors.questions.push('text error-question')
                }

            }else if(value.type == '2') { // radio
                if (value.answer && value.answer != 'undefined' && value.answer != null && value.answer.trim() != ''){
                    errors.questions.push(null)
                }else{
                    errors.error=true;
                    errors.questions.push('text error-question')
                }
            } else{//abierta
                if (value.answer && value.answer != null && value.answer.trim() != ''){
                    errors.questions.push(null)
                }else{
                    errors.error=true;
                    errors.questions.push('text error-question')
                }
            }
        })
        if (errors.error){
            console.log('Error ......')
            this.setState({ errors:errors });
        }else{
            console.log('ok .........')
            this.setState({btn:false, active:false, errors:errors})
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
        var handleClickDescargar= this.handleClickDescargar;
        var btnStyleT = this.state.btn ? {display:'initial'} : {display:'none'};
        var btnStyleD = this.state.btn ? {display:'none'} : {display:'initial'};
        var active = this.state.active
        var errors = this.state.errors

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
                                    className="check-cuestionario"
                                    disabled={!active}
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
						<div className={errors.questions[i] ? errors.questions[i] : "text"}>
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
                                        disabled={!active}
										onChange={handleChangeRadio}
										name={r}
										value={option}
										id={r + '-' + i + '-' + j} />
									<label htmlFor={r + '-' + i + '-' + j} className="radio"></label>
									{option}
								</div>
							);
						}
					);
					questionBody =
						<div className={errors.questions[i] ? errors.questions[i] : "text"}>
							{radios}
						</div>

				/*Opcion 3 respuesta abierta*/
				}else {
					questionBody =
						<div className={errors.questions[i] ? errors.questions[i] : "text"}>
							<textarea
                                disabled={!active}
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
							<div className= "question">
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
            <div className="body-cuestionario" id="cuestionario">
				<div className="row col-12 instrucciones">
					<Instructions title={this.instrucciones.title} text={this.instrucciones.text} />
				</div>
				<div className="row col-12 cuestionario">
                    <div className="force-overflow">
    					{questions}
                    </div>
				</div>
                <div className="div-btn">
                    <button style={btnStyleD} onClick={this.handleClickDescargar} className="button-terminar-ejercicio">Descargar</button>
                    <button style={btnStyleT} onClick={this.handleClickTerminar} className="button-terminar-ejercicio">Terminar</button>
                </div>
            </div>
        );
    }
}

export default Student;
