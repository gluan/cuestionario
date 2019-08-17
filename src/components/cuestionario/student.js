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
            var programa = ''
            var habilidad = ''
            var leccion = ''
            var preguntas = this.state.values.map(
                function iterator(question, item) {
                    var respuestas = '';
                    if (question.type == '1'){
                        question.options.map((option) =>{
                            if(option.checked)
                                respuestas = respuestas +option.value +', '
                        })
                    }
    				return(
                        <div style={{margin:'10%'}}>
                            <h3 style={{color:'#F06522'}}>{item+1}{'. '+question.question}</h3>
                            <div>{question.answer ? question.answer : respuestas}</div>
							<br/>
                        </div>
                    )
            })
            var color = '#1B586D'
            const Prints = () => (
              <div>
				<br/><br/><br/><br/><br/><br/><br/><br/>
                <div >
                    <div style={{color:color}}>Programa:<label style={{color:'#000'}}>{' '+programa}</label></div>
					<br/>
                    <div style={{color:'#1B586C'}}>Habilidad:<label style={{color:'#000'}}>{' '+habilidad}</label></div>
					<br/>
                    <div style={{color:color}}>Lección:<label style={{color:'#000'}}>{' '+leccion}</label></div>
                    <br/><br/>
                    <div style={{color:'#1B586C'}}>Instrucciones:
                        <label style={{color:'#000'}}>{' '+instrucciones}</label>
                    </div>
                </div>
				<br/><br/>
                <div>
                    {preguntas}
                </div>
              </div>
            );
            const string = renderToString(<Prints />);
            const doc = new jsPDF()
            const width = 170
            const elementHandlers = {
              '#ignorePDF': (element,renderer)=>{
                return true
              }
            }
			doc.setFontSize(10);
            var imgData = 'data:image/png;base64,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';
            doc.addImage(imgData, 'JPEG', 15, 10, 30, 20);
            //
			doc.setFontSize(12);
            doc.text(156, 20, "Fecha: " + today);
            doc.fromHTML(string,15,15,{width,elementHandlers},()=>{
              const pdf = doc.output('datauristring')
              if (typeof(pdf)==='string'&&pdf.length>0) {
                this.setState({pdf})
              }
            })
            doc.save('sample.pdf')
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
                    <button style={btnStyleD} onClick={this.handleClickDescargar} className="button-terminar-ejercicio">
						<img src="/img/ico-descarga.svg"  style={{ width: '10px', marginRight: '6px'}}/>Descargar
					</button>
                    <button style={btnStyleT} onClick={this.handleClickTerminar} className="button-terminar-ejercicio">
						<img src="/img/ico-terminar.svg"  style={{ width: '10px', marginRight: '6px'}}/>Terminar
					</button>
                </div>
            </div>
        );
    }
}

export default Student;
