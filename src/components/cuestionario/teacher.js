import React, { Component } from 'react';

class CuestionarioTeacher extends Component {
    constructor(props) {
        super(props);
        this.state={
            questions:[
                {
                    type:1,
                    question:'¿Cuál es el río más largo del mundo?',
                    options: [
                        'Misisipi',
                        'Amazonas',
                        'Nilo',
                        'Ninguno de los anteriores'
                    ],
                }
            ],
        }
        this.createDivs();
    }
    handleClickDelete(){
        this.state.questions.pop();
        this.createDivs();
        this.forceUpdate();
    }
    createDivs(){
        this.state.divs = this.state.questions.map(
            function iterator (value, i){
                return(
                    <div className="question-admin">
                        <div className="div-question">
                            <div>Pregunta {i+1}</div>
                            <input value={value.question} type="text" className="question-text-admin" />
                            <div className="type-question">
                                <input type="radio"  value="1" name={i} className="radio" />Respuesta abierta
                                <input type="radio"  value="2" name={i} className="radio" />Respuesta abierta
                                <input type="radio"  value="3" name={i} className="radio" />Respuesta abierta
                            </div>
                            <div className="questions-options">{value.type}</div>
                        </div>
                        <div className="div-delete" onClick={() => this.handleClickDelete(i)}></div>
                    </div>
                );
            }
        );
        console.log(this.state);
    }
    handleClick() {
        this.state.questions.push({type:1, question:'', options:[]});
        this.createDivs();
        this.forceUpdate();
    }

    render(){
        return(
            <div className="body-cuestionario-teacher">
                <div>Instrucciones de la actividad</div>
                <input type="text" className="text-teacher" />
                <div className="header-btn">
                    <div>
                        <label>Preguntas</label><br />
                        <label className="letter-red">*El minimo de preguntas es 1.</label>
                    </div>
                    <button onClick={() => this.handleClick()} className="button-agregar">+Agregar pregunta</button>
                </div>
                <div>
                    {this.state.divs}
                </div>
            </div>
        );
    }
}

export default CuestionarioTeacher;
