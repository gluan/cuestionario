import React, { Component } from 'react';
import $ from "jquery";
import './book.css';
import Instructions from '../instructions/instructions';
import Turn from './component-turn';

class Book extends Component {
	constructor(props){
		super(props);
		this.state={
			page1:'',
			page2:'',
			instrucciones:{
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
		console.log('1')
	  window.addEventListener('resize', this.resize);

	  var visible = document.getElementById('1');
	  var element = visible.parentElement.parentElement;
	  // console.log(element)
	  // console.log(visible.parentElement.parentElement);
	  console.log(element.style.display)
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
	handleClickTerminar(event){
		console.log('termino');
		console.log(this.state);
		console.log(this.state.page1 +' '+ this.state.page2);
	}

    render() {
        return(
            <div className="body-book ">
                <div className="row col-12 instrucciones">
                    <Instructions title={this.state.instrucciones.title} text={this.state.instrucciones.text} />
                </div>
				<div className="row col-12 book">
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
					<div className="col-12 div-btn">
						<button onClick={this.handleClickTerminar.bind(this)} className="button-terminar-ejercicio">Terminar</button>
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
