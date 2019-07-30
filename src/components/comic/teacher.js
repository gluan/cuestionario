import React, { Component } from 'react';
import './comic.css';

class StoryStudent extends Component{
    constructor(props){
        super(props);
        /*Cambios en instrucciones*/
        this.handleChangeInstructions = value => {
            this.setState({instructions: value.currentTarget.value});
        }
        /*this state*/
        this.state={
            restrict:'El máximo de elementos que puedes agragar por sección son 10',
            generalInstructions:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore'+
            ' magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
            <div className="body-story-teacher">
                <div className="general-instructions">
                    {this.state.generalInstructions}
                </div>
                <div>Instrucciones de la actividad</div>
                <textarea
                    type="textarea"
                    value={this.state.instructions}
                    onChange={handleChangeInstructions}
                    placeholder='Instrucciones ...'
                    id='instructions'
                    className={this.state.errors.instructions || "text-teacher-story"}
                    >
                </textarea>
                <label className="label-restrict">{'*'+this.state.restrict}</label>
				<div className="story-teacher">
                    <div className='elementos-div'>
                        <div className="img-element">
                            Fondos
                            <button>Seleccionar imagen</button>
                            <div className="div-elementos">
                                <div className="elemento">
                                    <label className="identificador-elemento">1</label>
                                    <img className="image-elemento" src='/img/story.jpg' />
                                    <label className="identificador-elemento">story.jpg</label>
                                    <label className="identificador-elemento">400 KB</label>
                                    <input className="input-tag" / >
                                    <button className="btn-borrar"></button>
                                </div>
                                <hr className="separador-elemento"/>
                                <div className="elemento">
                                    <label className="identificador-elemento">1</label>
                                    <img className="image-elemento" src='/img/story.jpg' />
                                    <label className="identificador-elemento">fondo-personaje.jpg</label>
                                    <label className="identificador-elemento">400 KB</label>
                                    <input className="input-tag" / >
                                    <button className="btn-borrar"></button>
                                </div>
                                <hr className="separador-elemento"/>
                            </div>
                        </div>
                        <div>
                            Personajes
                            <button>Seleccionar imagen</button>
                            <div className="div-elementos">
                                <div>
                                    <div>1</div>
                                    <div><img src='/img/story.jpg' /></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            Objetos
                            <button>Seleccionar imagen</button>
                            <div className="div-elementos">
                                <div>
                                    <div>1</div>
                                    <div><img src='/img/story.jpg' /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='buttons'>
                    <button onClick={() => this.handleClickInit()} className="button-reset">Volver a empezar</button>
                    <button onClick={() => this.handleClickFinish()} className="button-terminar">Terminar</button>
                </div>
            </div>
        )
    }
}

export default StoryStudent;
