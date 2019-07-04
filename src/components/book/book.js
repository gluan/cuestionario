import React, { Component } from 'react';

import './book.css';
import Instructions from '../instructions/instructions';

class Book extends Component {
    handleChange (event) {
        var text = event.target.value
        if(event.target.value.length >= 20){
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
		var instrucciones={
			title: 'Instrucciones',
			text: 'Responde el cuestionario selecionando la respuesta correcta en las preguntas de opcion multiple,'+ 
			'selecionanado las respuestas correctas en las preguntas de sellecion y escribiendo la respuesta en las preguntas abiertas'
		}
        return(
            <div className="body-book ">
			<div className="row">
                <Instructions title={instrucciones.title} text={instrucciones.text} />
				</div>
				<div className="row col-12 book">
					<div className="col-6 page">
						<textarea
							id="page-1"
							placeholder="Type here ..."
							onChange={this.handleChange.bind(this)}>
						</textarea>
					</div>
					<div className="col-6 page">
						<textarea
							id="page-2"
							onChange={this.handleChangePage.bind(this)}>
						</textarea>
					</div>
				</div>
            </div>
        );
    }
}

export default Book;
