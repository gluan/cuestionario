import React, { Component } from 'react';

import './book.css';
import Instructions from '../instructions/instructions';

class Book extends Component {
	constructor(props){
		super(props);
		this.state={
			instrucciones:{
				title: 'Instrucciones',
				text: 'Responde el cuestionario selecionando la respuesta correcta en las preguntas de opcion multiple,'+
				'selecionanado las respuestas correctas en las preguntas de sellecion y escribiendo la respuesta en las preguntas abiertas'
			}
		}
	}
    handleChange (event) {
        var text = event.target.value;
		if(document.getElementById("page-1").value.split('\n').length > 16 || event.target.value.length >= 550){
            var component = document.getElementById("page-2");
            component.focus();
        }
    };

    handleChangePage (event) {
        var text = event.target.value;
        if(event.target.value == 0){
            var component = document.getElementById("page-1");
            component.focus();
        }
    };

    render() {
        return(
            <div className="body-book ">
                <div className="row col-12 instrucciones">
                    <Instructions title={this.state.instrucciones.title} text={this.state.instrucciones.text} />
                </div>
				<div className="row col-12 book">
					<div className="img-fondo" ></div>
					<div className="img-fondo-abierto"></div>
					<div className="row col-12 b">

							<textarea
								id="page-1"
								placeholder="Type here ..."
								className="book-text"
								onChange={this.handleChange.bind(this)}>
							</textarea>

							<textarea
								id="page-2"
								className="book-text"
								onChange={this.handleChangePage.bind(this)}>
							</textarea>
					</div>
				</div>
            </div>
        );
    }
}

export default Book;
