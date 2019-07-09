import React, { Component } from 'react';

class CuestionarioTeacher extends Component {
    constructor(props) {
        super(props);
        /*Borra pregunta*/
        this.handleClickDelete =id =>{
            if (this.state.questions.length > 1){
                var question=[];
                this.state.questions.map((item, i) =>{
                    if (i != id.currentTarget.id){
                        question.push(item);
                    }
                });
                this.state.questions = question;
                this.createDivs();
                this.forceUpdate();
            }
        };
        /*Borra opcion*/
        this.handleClickDeleteOption =id =>{
            var ids=id.currentTarget.id.split('-');
            if (ids[1] > 1){
                var options=[];
                this.state.questions.map((value, i) =>{
                    if(i == ids[0] ){
                        value.options.map((option, j) =>{
                            if (j != ids[1]){
                                options.push(option);
                            }
                        });
                        this.state.questions[i].options=options;
                    }
                });
                this.createDivs();
                this.forceUpdate();
            }
        };
        /*Pinta opciones*/
        this.createOptions = values =>{
             var options = values.map((value, i) =>{
                // console.log(value);

            });
            return <div>hola</div>;

        }
        /*this. state*/
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


    createDivs(){
        var click = this.handleClickDelete;
        var opciones = this.createOptions;
        var deleteOption = this.handleClickDeleteOption;
        this.state.divs = this.state.questions.map(
            function iterator (value, i){
                var style = i >0 ? {display:'block'} : {display:'none'};
                var options = value.options.map(
                   function iterator (option, j){
                       var styleOption = j > 1 ? {display:'block'} : {display:'none'};
                       return(
                            <div className="option">
                                <input value={option} type="text" className="question-option" />
                                <button className="div-delete-option" id={i+'-'+j} style={styleOption} onClick={deleteOption}></button>
                            </div>
                       );
                   }
                );
                return(
                    <div className="question-admin">
                        <div className="div-question">
                            <div>Pregunta {i+1}</div>
                            <input value={value.question} type="text" className="question-text-admin" />
                            <div className="type-question">
                                <div><input type="radio"  value="3" name={i} className="radio" checked/>Respuesta abierta</div>
                                <div><input type="radio"  value="2" name={i} className="radio" />Opcion multiple</div>
                                <div><input type="radio"  value="1" name={i} className="radio" />Selección</div>
                            </div>
                            <div className="questions-options">
                                {options}
                            </div>
                        </div>
                        <button className="div-delete" onClick={click} id={i} style={style}></button>
                    </div>
                );
            }
        );
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
