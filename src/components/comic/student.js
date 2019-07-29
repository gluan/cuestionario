import React, {Component} from 'react';
import Instructions from '../instructions/instructions';
import './comic.css';
import './drag.js';
import { Stage } from 'react-konva';
import Konva from 'konva';
import domtoimage from 'dom-to-image';

class StoryStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            btn:true,
            elements:false,
            fondos:[
                { url:'/img/elementos/fondos/atardecer.jpg', id:'atardecer', status:true, tag:'triste'},
                { url:'/img/elementos/fondos/cabaña.jpg', id: 'cabaña', status:true, tag:'triste'},
                { url:'/img/elementos/fondos/castillo-dia.jpg', id:'castillo-dia', status:true, tag:'triste'},
                { url:'/img/elementos/fondos/castillo-interior.jpg', id:'castillo-interior', status:true, tag:'triste'},
                { url:'/img/elementos/fondos/castillo-noche.jpg', id:'castillo-noche', status:true, tag:'triste'}
            ],
            personajes:[
                { url:'/img/elementos/personajes/Diabillo-1.png', id:'diablito', status:false, tag:'enojado'},
                { url:'/img/elementos/personajes/S_AlberickSorprised_01.png', id: 'alberick', status:false, tag:'sorpresa'},
                { url:'/img/elementos/personajes/S_argus-diciendo-yo.png', id:'argus', status:false, tag:'animado'},
                { url:'/img/elementos/personajes/S_Arlinaleyendo.png', id:'arlina', status:false, tag:'feliz'},
                { url:'/img/elementos/personajes/S_TweenEvilFlame_01.png', id:'flame', status:false, tag:'enojado'},
                { url:'/img/elementos/personajes/S_Narrator_01.png', id:'diablito', status:false, tag:'enojado'},
                { url:'/img/elementos/personajes/S_GolemIntroVN_02.png', id: 'alberick', status:false, tag:'sorpresa'},
                { url:'/img/elementos/personajes/S_ScrubCharacterSchool_01.png', id:'argus', status:false, tag:'animado'},
                { url:'/img/elementos/personajes/S_Esben.png', id:'arlina', status:false, tag:'feliz'},
                { url:'/img/elementos/personajes/S-enya.png', id:'flame', status:false, tag:'enojado'},
                { url:'/img/elementos/personajes/Sombra.png', id:'diablito', status:false, tag:'enojado'},
                { url:'/img/elementos/personajes/S_GolemIntroVN_03.png', id: 'alberick', status:false, tag:'sorpresa'},
                { url:'/img/elementos/personajes/S_EileenHappy_01.png', id:'argus', status:false, tag:'animado'},
                { url:'/img/elementos/personajes/S_CharmingCharacterSchoo_01.png', id:'arlina', status:false, tag:'feliz'},
                { url:'/img/elementos/personajes/S_Arlinaangry_01.png', id:'flame', status:false, tag:'enojado'}
            ],
            textos:[],
            objetos:[
                { url:'/img/elementos/objetos/caldero.png', id:'diablito', status:false, tag:'enojado'},
                { url:'/img/elementos/objetos/cofre.png', id: 'alberick', status:false, tag:'sorpresa'},
                { url:'/img/elementos/objetos/escoba.png', id:'argus', status:false, tag:'animado'},
                { url:'/img/elementos/objetos/Escudo Corazon.png', id:'arlina', status:false, tag:'feliz'},
                { url:'/img/elementos/objetos/Escudo Morado Amarillo.png', id:'flame', status:false, tag:'enojado'},
                { url:'/img/elementos/objetos/letrero.png', id:'diablito', status:false, tag:'enojado'},
                { url:'/img/elementos/objetos/letrero2.png', id: 'alberick', status:false, tag:'sorpresa'},
                { url:'/img/elementos/objetos/poscion.png', id:'argus', status:false, tag:'animado'},
                { url:'/img/elementos/objetos/tesoro-gemas.png', id:'arlina', status:false, tag:'feliz'},
                { url:'/img/elementos/objetos/tesoro-monedas.png', id:'flame', status:false, tag:'enojado'}
            ],
            width:0,
            heigth: 0

        }
        this.instrucciones={
            image:'Arrastra las imágenes aqui',
			title: 'Instrucciones',
			text: 'Crea una historia'
		};

        /*Despliega menu elementos*/
        this.handleClick = value => {
            this.setState({
                elements:!this.state.elements
            });
        };
    }
    resize = () => {
        var stage = this.state.stage;
        var width = document.getElementById('container-story').offsetWidth - 5;
        var height = document.getElementById('container-story').offsetHeight - 5;
        stage.size({
          width: width,
          height: height
        });
        var layer = stage.getChildren(function(node){
           return node.getClassName() === 'Layer';
        });
        layer = layer[0]
        layer.size({
          width: width,
          height: height
        });
        var fondo = layer.getChildren(function(node){
           return node.getAttr('fondo') === 'true';
        });
        if (fondo != ''){
            fondo=fondo[0]
            fondo.size({
              width: width,
              height: height
            });
        }
        this.setState({
            width: width,
            height: height,
            stage: stage,
        });
        // this.forceUpdate();
	};
	componentWillUnmount() {
	  window.removeEventListener('resize', this.resize)
	};
    componentDidMount(){
         window.addEventListener('resize', this.resize);
        this.state.width = document.getElementById('container-story').offsetWidth - 5;
        this.state.height = document.getElementById('container-story').offsetHeight - 5;

        this.state.stage = new Konva.Stage({
            container: 'container-story',
            width: this.state.width,
            height: this.state.height
        });

        var layer = new Konva.Layer();

        this.state.stage.add(layer);

        this.state.stage.on("click", function(e) {
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

        var con = this.state.stage.container();
        var stage = this.state.stage;
        con.addEventListener('dragover', function(e) {
            e.preventDefault(); // !important
        });

        con.addEventListener('drop', function(e) {
            e.preventDefault();
            // var stage =this.state.stage;

            stage.setPointersPositions(e);
            // this.setState({stage:stage})
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
                        width: stage.attrs.width,
                        height: stage.attrs.height
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
                              imageDel.x(10);
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

                            layer.draw();
                        });
                        layer.draw();
                    });
                    // image.setAttr('position', stage.getPointerPosition());
                    image.position(stage.getPointerPosition());
                    image.draggable(true);
                    image.size({
                        width: 100,
                        height: 100
                    });
                    image.setAttr('position', stage.getPointerPosition());
                }
                image.setAttr('fondo', dataset);
                layer.draw();
            });
        });
    }
    handleClickElements(event){
        this.setState({ element:event.target.id });
    }
    handleClickTerminar(value){
        console.log('terminar');
        this.setState({btn:false});
        this.handleDelete();
        /*TODO: Falta dar formato a respuestA*/
    };
    handleClickDescargar(value){
        console.log('descargar');
        this.handleDelete();
        domtoimage.toJpeg(document.getElementById('body-story'), { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image.jpeg';
            link.href = dataUrl;
            link.click();
        });

    }
    handleDelete(){
        var layer= this.state.stage.children[0]
        var transform = layer.getChildren(function(node){
           return node.getClassName() === 'Transformer';
        });
        transform.destroy();
        layer.draw();

        this.setState({elements:false});
    }

    render(){
        var btnStyleT = this.state.btn ? {display:'initial'} : {display:'none'};
        var btnStyleD = this.state.btn ? {display:'none'} : {display:'initial'};
        var style = this.state.elements ? {display:'block'} : {display:'none'};
        var imagenes = [];
        if(this.state.element == 'personajes'){
            imagenes = this.state.personajes.map((image, index)=>{
                return (
                    <img
                        data-options={image.status}
                        name={image.tag}
                        id={image.id}
                        className='img-personajes'
                        src={image.url}
                        draggable="true"/>
                )
            })
        }else if(this.state.element == 'objetos'){
            imagenes = this.state.objetos.map((image, index)=>{
                return (
                    <img
                        data-options={image.status}
                        name={image.tag}
                        id={image.id}
                        className='img-objetos'
                        src={image.url}
                        draggable="true"/>
                )
            })
        }else if(this.state.element == 'textos'){
            imagenes = this.state.textos.map((image, index)=>{
                return (
                    <img
                        data-options={image.status}
                        name={image.tag}
                        id={image.id}
                        className='img-elementos'
                        src={image.url}
                        draggable="true"/>
                )
            })
        }else {
            imagenes = this.state.fondos.map((image, index)=>{
                return (
                    <img
                        data-options={image.status}
                        name={image.tag}
                        id={image.id}
                        className='img-fondos'
                        src={image.url}
                        draggable="true"/>
                )
            })
        }


        return(
            <div className="body-story" id='body-story'>
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
                            <button className='fondos' id='fondos' onClick={this.handleClickElements.bind(this)}></button>
                            <button className='personajes' id='personajes' onClick={this.handleClickElements.bind(this)}></button>
                            <button className='textos' id='textos' onClick={this.handleClickElements.bind(this)}></button>
                            <button className='objetos' id='objetos' onClick={this.handleClickElements.bind(this)}></button>
                        </div>
                        <div id="navbarFondos" className="imagenes elementos">
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
                    <button style={btnStyleD} onClick={this.handleClickDescargar.bind(this)} className="button-terminar-ejercicio-s">Descargar</button>
                    <button style={btnStyleT} onClick={this.handleClickTerminar.bind(this)} className="button-terminar-ejercicio-s">Terminar</button>
                </div>
            </div>
        )
    }
}

export default StoryStudent;
