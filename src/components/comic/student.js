import React, {Component} from 'react';
import Instructions from '../instructions/instructions';
import './comic.css';
// import AppPrueba from './prueba';

import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import AppDragDropDemo from './drag';

class StoryStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            elements:false,
            fondos:[
                '/img/elementos/fondos/atardecer.jpg',
                '/img/elementos/fondos/cabaña.jpg',
                '/img/elementos/fondos/castillo-dia.jpg',
                '/img/elementos/fondos/castillo-interior.jpg',
                '/img/elementos/fondos/castillo-noche.jpg'
            ]
        }
        this.instrucciones={
            image:'Arrastra las imágenes aqui',
			title: 'Instrucciones',
			text: 'Crea una historia'
		};

        /*Despliega menu elementos*/
        this.handleClick = value => {
            console.log('click');
            this.setState({
                elements:!this.state.elements
            });
        };

        /*Terminar formulario*/
		this.handleClickTerminar = value => {
			console.log('terminar');
			console.log(this.state);
		}
    }

    render(){
        var style = this.state.elements ? {display:'block'} : {display:'none'};
        var imagenes = this.state.fondos.map((image, index)=>{
            console.log(image);
            return (
                <img className='img-elementos' src={image} />
            )

        })
        return(
            <div className="body-story">
                <div className="row col-12 instrucciones">
                    <Instructions
                        title={this.instrucciones.title}
                        text={this.instrucciones.text} />
                </div>
                <div className="row col-12 story-content">
                    <button
                        className="menu btn-menu"
                        type="button"
                        onClick={this.handleClick}>
                    </button>
                    <div className="btn-menu-fondo" style={style}>
                        <div className="iconos">
                            <div className='fondos'></div>
                            <div className='personajes'></div>
                            <div className='textos'></div>
                            <div className='objetos'></div>
                        </div>
                        <div id="navbarFondos" className="imagenes">
                            {imagenes}
                        </div>
                    </div>
                    <div className="story-border">
                        <div className="story">
                            <div className="story-text">{this.instrucciones.image}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="div-btn">
                    <button onClick={this.handleClickTerminar} className="button-terminar-ejercicio">Terminar</button>
                </div>
                {// <AppPrueba />
                // <AppDragDropDemo />
                }

            </div>
        )
    }
}

export default StoryStudent;
