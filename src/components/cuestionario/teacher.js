import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CuestionarioTeacher extends Component {
    constructor(props) {
        super(props);
        /*Borra pregunta*/
        this.handleClickDelete =id => {
            if (this.state.questions.length > 1){
                var question=[];
                this.state.questions.map((item, i) =>{
                    if (i != id.currentTarget.id){
                        question.push(item);
                    }
                });
                this.setState({questions:question});
            }
        };
        /*Borra opcion*/
        this.handleClickDeleteOption =id => {
            var ids=id.currentTarget.id.split('-');
            if (ids[1] > 1){
                var questions=this.state.questions;
                var options=[];
                this.state.questions.map((value, i) =>{
                    if(i == ids[0] ){
                        value.options.map((option, j) =>{
                            if (j != ids[1]){
                                options.push(option);
                            }
                        });
                        questions[i].options = options;
                    }
                });
                this.setState({questions:questions});
            }
        };
        /*Agrega opcion*/
        this.handleClickAddOption = value =>{
            var questions=this.state.questions;
            questions[value.currentTarget.id.split('-')[0]].options.push('');
            this.setState({questions:questions});
        }
        /*Change en pregunta*/
        this.handleChangeEventQuestion = value => {
            var index =value.currentTarget.id.split('-')[1];
            var questions=this.state.questions
            questions[index].question= value.currentTarget.value;
            this.setState({questions:questions})
        }
        /**Change opciones*/
        this.handleChangeEventOption = value => {
            var i =value.currentTarget.id.split('-')[1];
            var j =value.currentTarget.id.split('-')[2];
            var questions=this.state.questions;
            questions[i].options[j]= value.currentTarget.value;
            this.setState({questions:questions});
        }
        /*Cambia tipo de pregunta*/
        this.handleChangeEventType = value => {
            var questions = this.state.questions;
            questions[value.currentTarget.name].type = value.currentTarget.value;
            this.setState({questions:questions});
        }
        /*Cambios en instrucciones*/
        this.handleChangeInstructions = value => {
            this.setState({instructions: value.currentTarget.value});
        }
        /*this state*/
        this.state={
            errors:{questions:[]},
            instructions:'',
            questions:[
                {
                    type:3,
                    question:'',
                    options: ['', '', ''],
                }
            ],
        }
    }
    /*Reiniciar cuestionario*/
    handleClickInit(){
        this.setState({
            questions:[
                {
                    type:3,
                    question:'',
                    options: ['', '', ''],
                }
            ],
        });
    }
    /*Agregar pregunta*/
    handleClick() {
        var questions = this.state.questions;
        questions.push({type:3, question:'', options: ['', '', ''],});
        this.setState({questions:questions});
    }
    /*Validaciones cuestionario*/
    validate(){
        var errors= {questions:[]};
        errors.error=false;
        if (this.state.instructions == null ||this.state.instructions == '' || this.state.instructions == ' '){
            errors.instructions = 'text-teacher error';
            errors.error=true;
        }else {
            errors.instructions = 'text-teacher';
        }
        this.state.questions.map(
            function iterator (value, i) {
                var question = {
                    question: '',
                    options:[]
                };
                if (value.question == null || value.question == '' || value.question == ' '){
                    errors.error=true;
                    question.question='question-text-admin error';

                }else{
                    question.question='question-text-admin';
                }
                if(value.type != 3) {
                    value.options.map(
                        function iterator (option, j) {
                            var o = '';
                            if (j != value.options.length-1 && ( option == null || option == '' || option == ' ')){
                                errors.error=true;
                                o='question-option error';
                            }else{
                                o='question-option';
                            }
                        question.options.push(o);
                        }
                    );
                }
                errors.questions.push(question);
            }
        );
        this.setState({errors:errors});
    }
    /*Finalizar cuestionario*/
    handleClickFinish(){
        this.validate();
        if(!this.state.errors.error){
            //TODO: Enviar datos
            console.log('enviar datos ....');
            console.log(this.state);
        }
    }

    render(){
        var errors =this.state.errors;
        var click = this.handleClickDelete;
        var opciones = this.createOptions;
        var deleteOption = this.handleClickDeleteOption;
        var addOption = this.handleClickAddOption;
        var handleChangeEventQuestion = this.handleChangeEventQuestion;
        var handleChangeEventOption = this.handleChangeEventOption;
        var handleChangeEventType = this.handleChangeEventType;
        var handleChangeInstructions = this.handleChangeInstructions;
        var divs = this.state.questions.map(
            function iterator (value, i){
                var style = i >0 ? {display:'block'} : {display:'none'};
                var styleDisplayOptions = value.type != 3 ? {display:'block'} : {display:'none'};
                var tam =value.options.length -1;
                var options = value.options.map(
                   function iterator (option, j){
                       var styleOption = j > 1  && j != tam ? {display:'block'} : {display:'none'};
                       var styleOptionAdd = j === tam ? {display:'block'} : {display:'none'};
                       return(
                            <div className="option">
                                <input
                                    placeholder='Opcion ..'
                                    value={option}
                                    onChange={handleChangeEventOption}
                                    type="text"
                                    id={'option-'+i+'-'+j}
                                    className={errors.questions && errors.questions[i] && errors.questions[i].options && errors.questions[i].options[j]  && errors.questions[i].options[j] != errors.questions[i].options.length ? errors.questions[i].options[j] : "question-option"}
                                />
                                <button className="div-delete-option" id={i+'-'+j} style={styleOption} onClick={deleteOption}></button>
                                <button className="div-add-option" id={i+'-'+j} style={styleOptionAdd} onClick={addOption}></button>
                            </div>
                       );
                   }
                );
                return(
                    <div className="question-admin">
                        <div className="div-question">
                            <div>Pregunta {i+1}</div>
                            <input
                                value={value.question}
                                onChange={handleChangeEventQuestion}
                                type="text"
                                className={errors.questions && errors.questions[i] && errors.questions[i].question ? errors.questions[i].question : "question-text-admin"}
                                id={'question-'+i}
                                placeholder='Pregunta ...'
                            />
                            <div className="type-question">

                                <div><input type="radio"  value="3" name={i} className="radio" checked={value.type==3} onChange={handleChangeEventType}/>Respuesta abierta</div>
                                <div><input type="radio"  value="2" name={i} className="radio" checked={value.type==2} onChange={handleChangeEventType}/>Opcion multiple</div>
                                <div><input type="radio"  value="1" name={i} className="radio" checked={value.type==1} onChange={handleChangeEventType}/>Selección</div>
                            </div>
                            <div style={styleDisplayOptions} className="questions-options" id={"divOpciones-"+i} >
                                {options}
                            </div>
                        </div>
                        <button className="div-delete" onClick={click} id={i} style={style}></button>
                    </div>
                );
            }
        );

        return(
            <div className="body-cuestionario-teacher">
                <div>Instrucciones de la actividad</div>
                <input
                    type="text"
                    value={this.state.instructions}
                    onChange={handleChangeInstructions}
                    placeholder='Instrucciones ...'
                    id='instructions'
                    className={this.state.errors.instructions || "text-teacher"}
                />
                <div className="header-btn">
                    <div>
                        <label>Preguntas</label><br />
                        <label className="letter-red">*El minimo de preguntas es 1.</label>
                    </div>
                    <button onClick={() => this.handleClick()} className="button-agregar">+Agregar pregunta</button>
                </div>
                <div className="preguntas">
                    <div className="force-overflow-preguntas">
                        {divs}
                    </div>
                </div>
                <div className='buttons'>
                    <button onClick={() => this.handleClickInit()} className="button-reset">Volver a empezar</button>
                    <button onClick={() => this.handleClickFinish()} className="button-terminar">Terminar</button>
                </div>
            </div>
        );
    }
}

export default CuestionarioTeacher;
