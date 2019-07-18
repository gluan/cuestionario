import React, { Component } from 'react';

class CuestionarioTeacher extends Component {
    constructor(props) {
        super(props);
        /*Cambios en instrucciones*/
        this.handleChangeInstructions = value => {
            this.setState({instructions: value.currentTarget.value});
        }
        /*this state*/
        this.state={
            errors:{},
            instructions:'',
        }
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
	/*Reiniciar cuestionario*/
    handleClickInit(){
        this.setState({instructions:'',});
    }

    render(){
        var errors =this.state.errors;
        var handleChangeInstructions = this.handleChangeInstructions;

        return(
            <div className="body-cuestionario-teacher">
                <div>Instrucciones de la actividad</div>
                <textarea
                    type="textarea"
                    value={this.state.instructions}
                    onChange={handleChangeInstructions}
                    placeholder='Instrucciones ...'
                    id='instructions'
                    className={this.state.errors.instructions || "text-teacher"}
                    >
                </textarea>
				<div className="div-body"></div>
                <div className='buttons'>
                    <button onClick={() => this.handleClickInit()} className="button-reset">Volver a empezar</button>
                    <button onClick={() => this.handleClickFinish()} className="button-terminar">Terminar</button>
                </div>
            </div>
        );
    }
}

export default CuestionarioTeacher;
