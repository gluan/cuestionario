import React, { Component } from 'react';
import ReactDom from 'react-dom';
import $ from "jquery";
import './book.css';
import Instructions from '../instructions/instructions';
import Turn from './component-turn';
import domtoimage from 'dom-to-image';

class Book extends Component {
	constructor(props){
		super(props);
		this.state={
			btn: true,
			page1:'',
			page2:'',
			instrucciones: {
				title: 'Instrucciones',
				text: 'Escribe como te sentiste al realizar la actividad'
			}
		}
	}
    handleChange (event) {
        var text = event.target.value;
		this.setState({page1: text})
		if(document.getElementById("page-1").value.split('\n').length > 13 || event.target.value.length >= 250){
            var component = document.getElementById("page-2");
            component.focus();
        }
    };

    handleChangePage (event) {
        var text = event.target.value;
		this.setState({page2: text})
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
	  window.addEventListener('resize', this.resize);
	  var visible = document.getElementById('1');
	  var element = visible.parentElement.parentElement;
	  if(element.style.display=='none'){
		  console.log('1')
		  this.setState({isVisible:false})
	  }else{
		  console.log('1')
		  this.setState({isVisible:true})
	  }
	};

	componentWillUnmount() {
		console.log('2')
	  window.removeEventListener('resize', this.resize)
	};
	handleChangeTurn(){
		console.log('turn')
	}
	handleClickTerminarB(event){
		console.log('termino');
		var text = this.state.page1 +' '+ this.state.page2;
		if(text == '' || text == ' ' || text.length <2){
			console.log('tienes que completar el ejercicio')
		}else{
			this.setState({btn:false});
			console.log(this.state);
			console.log(this.state.page1 +' '+ this.state.page2);
		}
	}
	handleClickDescargar(event){
		console.log('Descargar');
		domtoimage.toJpeg(document.getElementById('book'), { quality: 0.95 })
	    .then(function (dataUrl) {
	        var link = document.createElement('a');
	        link.download = 'my-image.jpeg';
	        link.href = dataUrl;
	        link.click();
	    });
	}

    render() {
		console.log('render');
		var btnStyleT = this.state.btn ? {display:'initial'} : {display:'none'};
        var btnStyleD = this.state.btn ? {display:'none'} : {display:'initial'};
		var handleClickTerminarB = this.handleClickTerminarB;

        return(
            <div className="body-book" id='book'>
                <div className="row col-12 instrucciones">
                    <Instructions title={this.state.instrucciones.title} text={this.state.instrucciones.text} />
                </div>
				<div className="row col-12 book">
					<div className="col-12">
						<Turn
							options={options}
							className="magazine"
							onChange={this.handleChangeTurn.bind(this)}>
					      {pages.map((page, index) => (
					        <div id={index} key={index}
								className={index == 0 ? 'hard': ''}>
								<img className="image-book" src={page} alt="" />
								<textarea
									id={"page-"+index}
									placeholder={index==1 ? "Type here ...": ""}
									className="book-text"
									defaultValue={index == 1 ? this.state.page1: this.state.page2}
									onChange={index == 1 ? this.handleChange.bind(this) : this.handleChangePage.bind(this)}>
								</textarea>
					        </div>
					      ))}
					    </Turn>
					</div>
					<div className="div-btn-b">
						<button style={btnStyleT} onClick={this.handleClickTerminarB.bind(this)} className="button-terminar-ejercicio-b">Terminar</button>
						<button style={btnStyleD} onClick={this.handleClickDescargar.bind(this)} className="button-terminar-ejercicio-b">Descargar</button>
					</div>
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
		// console.log(isVisible)
    }
  }
};

const pages = [
  "img/libro-cerrado.png",
  "img/pagina-1.png",
  "img/pagina-2.png",
];

export default Book;
