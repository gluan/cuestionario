import React, {Component} from 'react';
import Instructions from '../instructions/instructions';
import './comic.css';
// import AppPrueba from './prueba';

// import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
// import AppDragDropDemo from './drag';
import { Stage } from 'react-konva';
import Konva from 'konva';

class StoryStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            elements:false,
            fondos:[
                { url:'/img/elementos/fondos/atardecer.jpg', id:'atardecer', status:true, tag:'triste'},
                { url:'/img/elementos/fondos/cabaña.jpg', id: 'cabaña', status:true, tag:'triste'},
                { url:'/img/elementos/fondos/castillo-dia.jpg', id:'castillo-dia', status:false, tag:'triste'},
                { url:'/img/elementos/fondos/castillo-interior.jpg', id:'castillo-interior', status:false, tag:'triste'},
                { url:'/img/elementos/fondos/castillo-noche.jpg', id:'castillo-noche', status:false, tag:'triste'}
            ],
            elementsImg:[]
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
    componentDidMount(){
        /*Drag and drop*/
        var state= this.state;
        var elementos=[];

        var width = document.getElementById('container-story').offsetWidth;
        var height = document.getElementById('container-story').offsetHeight;

        var stage = new Konva.Stage({
            container: 'container-story',
            width: width,
            height: height
        });

        var layer = new Konva.Layer();
        stage.add(layer);

        // what is url of dragging element?
        var itemURL = '';
        var itemKey = '';
        var itemTag = '';
        var isBack = '';
        document.getElementById('navbarFondos')
        .addEventListener('dragstart', function(e) {
          itemURL = e.target.src;
          itemKey = e.target.id;
          itemKey = e.target.name;
          console.log(e.target.data)
          // state.fondos.map((image, index)=>{
          //     if(itemKey == )
          //     console.log(image)
          // })
        });

        var con = stage.container();
        con.addEventListener('dragover', function(e) {
            console.log('dragover')
            e.preventDefault(); // !important
        });

        con.addEventListener('drop', function(e) {
            console.log('drop');
            console.log(e)
            e.preventDefault();
            // now we need to find pointer position
            // we can't use stage.getPointerPosition() here, because that event
            // is not registered by Konva.Stage
            // we can register it manually:
            stage.setPointersPositions(e);
            Konva.Image.fromURL((itemURL), function(image) {
                layer.add(image);
                var status= true;
                console.log('status: ' + status)
                if(status){
                    console.log('fondo');
                    image.position({});
                    image.draggable(false);
                    image.size({
                        width: width,
                        height: height
                    });

                }else{
                    console.log('elemento');

                    image.position(stage.getPointerPosition());
                    image.draggable(true);
                    image.size({
                        width: 200,
                        height: 200
                    });
                }

                console.log(image.getAttrs())
                elementos.push({
                    key: itemKey,
                    atributes: image.getAttrs(),
                });
                console.log(elementos);

                layer.draw();

            });

        });


    }

    render(){
        var style = this.state.elements ? {display:'block'} : {display:'none'};
        var imagenes = this.state.fondos.map((image, index)=>{
            return (
                <img data={image.status} name={image.tag} id={image.key} className='img-elementos' src={image.url} draggable="true"/>
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
                        <div className="story" id='container-story'>
                            <div className="story-text" >
                                {this.instrucciones.image}
                            </div>
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
