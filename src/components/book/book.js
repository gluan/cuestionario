import React, { Component } from 'react';
import $ from "jquery";
import './book.css';
import Instructions from '../instructions/instructions';
import Turn from './component-turn';

class Book extends Component {
	constructor(props){
		super(props);
		this.state={
			instrucciones:{
				title: 'Instrucciones',
				text: 'Escribe como te sentiste al realizar la actividad'
			}
		}
	}
    handleChange (event) {
        var text = event.target.value;
		if(document.getElementById("page-1").value.split('\n').length > 13 || event.target.value.length >= 250){
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

	resize = () => {
		console.log('resize');
		this.forceUpdate()
	};

	componentDidMount() {
		console.log('1')
	  window.addEventListener('resize', this.resize)
	};

	componentWillUnmount() {
		console.log('2')
	  window.removeEventListener('resize', this.resize)
	};

    render() {
		var style ={
			display:isVisible ? 'block' : 'none'
		}
		console.log('render')
        return(
            <div className="body-book ">
                <div className="row col-12 instrucciones">
                    <Instructions title={this.state.instrucciones.title} text={this.state.instrucciones.text} />
                </div>
				<div className="row col-12 book">
					<Turn options={options} className="magazine">
				      {pages.map((page, index) => (
				        <div key={index} className={index == 0 ? 'hard': ''}>
				          <img className="image-book" src={page} alt="" />
				        </div>
				      ))}
				    </Turn>
					<div className="row col-12 b" style={style}>
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
				<div className="div-btn">
                    <button onClick={this.handleClickTerminar} className="button-terminar-ejercicio">Terminar</button>
                </div>
            </div>
        );
    }
}
var isVisible=true;

var options = {
  // width: 800,
  // height: 600,
  width:$.width,
  height: $.heigth,
  autoCenter: true,
  display: "double",
  acceleration: true,
  elevation: 50,
  gradients: !$.isTouch,
  duration: 2400,
  when: {
    turned: function(e, page) {
		if($(this).turn("view")[0]==2){
			isVisible = true;
		}else{
			isVisible = false;
		}
		console.log(isVisible)
    }
  }
};

const pages = [
  "img/libro-cerrado.png",
  "img/pagina-1.png",
  "img/pagina-2.png",
];

export default Book;
