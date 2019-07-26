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
		};
    }
    componentDidMount(){
        /*Drag and drop*/
        // var elementos=[{}];

        var width = document.getElementById('container-story').offsetWidth - 5;
        var height = document.getElementById('container-story').offsetHeight - 5;

        var stage = new Konva.Stage({
            container: 'container-story',
            width: width,
            height: height
        });

        var layer = new Konva.Layer();

        stage.add(layer);
        stage.on("click", function(e) {
            var transform = layer.getChildren(function(node){
               return node.getClassName() === 'Transformer';
            });
            transform.destroy();
            var del = layer.getChildren(function(node){
               return node.getAttr('del') === 'true';
            });
            del.destroy();
            layer.draw();
        });

        var itemURL = '';
        var itemKey = '';
        var itemTag = '';
        var dataset = '';
        document.getElementById('navbarFondos')
        .addEventListener('dragstart', function(e) {
          itemURL = e.target.src;
          itemKey = e.target.id;
          itemTag = e.target.name;
          dataset= e.target.dataset.options;
        });

        var con = stage.container();
        con.addEventListener('dragover', function(e) {
            console.log('dragover')
            e.preventDefault(); // !important
        });

        con.addEventListener('drop', function(e) {
            console.log('drop');
            e.preventDefault();
            stage.setPointersPositions(e);
            Konva.Image.fromURL((itemURL), function(image) {
                layer.add(image);
                image.setAttr('id', itemKey);
                image.setAttr('tag', itemTag);
                image.setAttr('url', itemURL);
                /*Valida si es un fondo*/
                if(dataset == 'true'){
                    image.position({});
                    image.draggable(false);
                    image.size({
                        width: width,
                        height: height
                    });
                    var fondo = layer.getChildren(function(node){
                       return node.getAttr('fondo') === 'true';
                    });
                    image.zIndex(fondo.getAbsoluteZIndex());
                    fondo.destroy();
                    image.on("click", function(e) {
                        var transform = layer.getChildren(function(node){
                           return node.getClassName() === 'Transformer';
                        });
                        transform.destroy();
                        var del = layer.getChildren(function(node){
                           return node.getAttr('del') === 'true';
                        });
                        del.destroy();
                        layer.draw();
                    });
                /*Si es un elemento*/
                }else{
                    image.on("click", function(e) {
                        var transform = layer.getChildren(function(node){
                           return node.getClassName() === 'Transformer';
                        });
                        transform.destroy();
                        var del = layer.getChildren(function(node){
                           return node.getAttr('del') === 'true';
                        });
                        del.destroy();
                        var newURL= itemURL.split('/img/')[0]+'/img/tache.svg';
                        Konva.Image.fromURL(newURL, function(imageDel) {
                            var tr1 = new Konva.Transformer({
                                node: image,
                                keepRatio: true,
                            });
                            layer.add(tr1);
                            tr1.add(imageDel);
                            tr1.on('transform', () => {
                              imageDel.x(0);
                            })
                            imageDel.draggable(false);
                            imageDel.size({
                                width: 25,
                                height: 25
                            });
                            imageDel.setAttr('del', 'true');
                            imageDel.position({x: 0, y: -25})
                            imageDel.on("click", function(e) {
                                var transform = layer.getChildren(function(node){
                                   return node.getClassName() === 'Transformer';
                                });
                                transform.destroy();
                                var del = layer.getChildren(function(node){
                                   return node.getAttr('del') === 'true';
                                });
                                del.destroy();
                                imageDel.destroy();
                                image.destroy();
                                layer.draw();
                            });

                            // imageDel.x(tr1.getWidth())

                            layer.draw();
                        });




                        // image.destroy();
                        layer.draw();
                    });
                    image.setAttr('position', stage.getPointerPosition());
                    image.position(stage.getPointerPosition());
                    image.draggable(true);
                    image.size({
                        width: 200,
                        height: 200
                    });
                }
                image.setAttr('fondo', dataset);
                layer.draw();
            });
            console.log('stage');
            console.log(stage);
        });
        this.setState({stage:stage});
    }

    render(){
        var style = this.state.elements ? {display:'block'} : {display:'none'};
        var imagenes = this.state.fondos.map((image, index)=>{
            return (
                <img data-options={image.status} name={image.tag} id={image.id} className='img-elementos' src={image.url} draggable="true"/>
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
