import React, { Component } from 'react';
import Instructions from '../instructions/instructions';
import './comic.css';

class StoryStudent extends Component{
    constructor(props){
        super(props);
        this.instrucciones={
            image:'Arrastra las imágenes aqui',
			title: 'Instrucciones',
			text: 'Responde el cuestionario selecionando la respuesta correcta en las preguntas de opcion multiple,'+
			'selecionanado las respuestas correctas en las preguntas de sellecion y escribiendo la respuesta en las preguntas abiertas'
		};
    }

    render(){
        return(
            <div className="body-story">
                <div className="row col-12 instrucciones">
                    <Instructions title={this.instrucciones.title} text={this.instrucciones.text} />
                </div>
                <div className="row col-12 story-content">
                    <div className="story-border">
                        <div className="story">
                            <div className="story-text">{this.instrucciones.image}</div>
                        </div>
                    </div>
                </div>
                <div className="div-btn">
                    <button onClick={this.handleClickTerminar} className="button-terminar-ejercicio">Terminar</button>
                </div>

            </div>
        )
    }
}

export default StoryStudent;
