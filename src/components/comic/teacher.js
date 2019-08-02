import React, { Component } from 'react';
import './comic.css';
import StoryTeacherImage from './teacherImage';
import DragAndDrop from './DragDrop';

class StoryStudent extends Component{
    constructor(props){
        super(props);
        /*Cambios en instrucciones*/
        this.handleChangeInstructions = value => {
            this.setState({instructions: value.currentTarget.value});
        }
        /*this state*/
        this.state = {
            restrictLabel:false,
            files: [],
            view:true,
            predefinidas: false,
            restrict:'El máximo de elementos que puedes agregar por sección son 10.',
            generalInstructions:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore'+
            ' magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            errors:{},
            instructions:'',
            imagenesPredefinidas:{
                fondos:[
                    { url:'/img/elementos/fondos/atardecer.jpg', id:'atardecer'},
                    { url:'/img/elementos/fondos/cabaña.jpg', id: 'cabaña'},
                    { url:'/img/elementos/fondos/castillo-dia.jpg', id:'castillo-dia'},
                    { url:'/img/elementos/fondos/castillo-interior.jpg', id:'castillo-interior'},
                    { url:'/img/elementos/fondos/castillo-noche.jpg', id:'castillo-noche'}
                ],
                objetos:[
                    { url:'/img/elementos/objetos/caldero.png', id:'diablito'},
                    { url:'/img/elementos/objetos/cofre.png', id: 'alberick'},
                    { url:'/img/elementos/objetos/escoba.png', id:'argus'},
                    { url:'/img/elementos/objetos/Escudo Corazon.png', id:'arlina'},
                    { url:'/img/elementos/objetos/Escudo Morado Amarillo.png', id:'flame'},
                    { url:'/img/elementos/objetos/letrero.png', id:'diablito', },
                ],
                personajes: [
                    { url:'/img/elementos/personajes/Diabillo-1.png', id:'diablito'},
                    { url:'/img/elementos/personajes/S_AlberickSorprised_01.png', id: 'alberick'},
                    { url:'/img/elementos/personajes/S_argus-diciendo-yo.png', id:'argus'},
                    { url:'/img/elementos/personajes/S_Arlinaleyendo.png', id:'arlina'},
                    { url:'/img/elementos/personajes/S_TweenEvilFlame_01.png', id:'flame'},
                    { url:'/img/elementos/personajes/S_Narrator_01.png', id:'diablito'},
                ]
            }
        }
        this.handleAdd= value =>{
            console.log('add')
            console.log(value)
            console.log(value.currentTarget)
            console.log(value.currentTarget.id);
            console.log(value.target.checked)
            var images = this.state.imagenes;
            images[value.target.id].isAdd= value.target.checked
            var count=0;
            var restrictLabel=false;
            images.map((item, key) =>{
                if(item.isAdd){
                    count ++;
                }
            });
            if (count > 3){
                images[value.target.id].isAdd= false
                document.getElementById(value.target.id).checked=false;
                restrictLabel=true;
            }
            console.log('count '+ count)
            this.setState({imagenes:images, restrictLabel:restrictLabel})
        }
    }
    /*Validaciones cuestionario*/
    validate(){
        var errors= {questions:[]};
        errors.error=false;
        if (this.state.instructions == null || this.state.instructions == '' || this.state.instructions == ''){
            errors.instructions = 'text-teacher-story error';
            errors.error=true;
        }else {
            errors.instructions = 'text-teacher-story';
        }
        this.setState({errors:errors});
    }
    /*Finalizar cuestionario*/
    handleClickFinish(){
        // this.validate();
        if(!this.state.errors.error){
            //TODO: Enviar datos
            console.log('enviar datos ....');
            console.log(this.state);
        }
    }
	/*Reiniciar cuestionario*/
    handleClickInit(){
        this.setState({instructions:'',});
    }
    /*Imagenes predefinidas*/
    handleClickImagenes(){
        console.log('imagenes predefinidas...');
        this.setState({predefinidas:true,});
    }
    handleClickSelecionar(e){
        console.log('Seleccionar imagenes...');
        console.log(e);
        var imagenes=[];
        if (e=='fondos'){
            imagenes = this.state.imagenesPredefinidas.fondos;
        }else if(e == 'personajes'){
            imagenes = this.state.imagenesPredefinidas.personajes
        }else{
            imagenes = this.state.imagenesPredefinidas.objetos;
        }
        this.setState({
            predefinidas:false,
            imagenes: imagenes,
            view: false,
        });
    }
    handleCancelUploadImage = (event) => {
        console.log('handleCancelUploadImage ..........')
        console.log(event)
    }
    handleClickCancel(){
        console.log('Cancel')
        this.setState({view: true,})
    }

    render(){
        console.log('Estado .....');
        console.log(this.state)
        var errors =this.state.errors;
        var btnStyleDefault = this.state.btn ? {display:'initial'} : {display:'none'};
        var btnStyleImg = this.state.btn ? {display:'none'} : {display:'initial'};
        var handleChangeInstructions = this.handleChangeInstructions;
        var fondos = [];
        var objetos = [];
        var personajes = [];

        if (this.state.predefinidas == true){
            fondos = this.state.imagenesPredefinidas.fondos.map(
                function iterator (value, i){
                    return (
                        <div>
                            <div className="elemento">
                                <label className="identificador-elemento">{i+1}</label>
                                <div className="div-image-elemento">
                                    <img className="image-elemento" src={value.url} />
                                </div>
                                <label className="nombre-elemento">fondo.eldventir1.jpg</label>
                                <label className="peso-elemento">400 KB</label>
                                <img src="/img/tag.svg" className="img-tag"/>
                                <input className="input-tag" / >
                            </div>
                            <hr className="separador-elemento"/>
                        </div>
                    )
                }
            );

            objetos = this.state.imagenesPredefinidas.objetos.map(
                function iterator (value, i){
                    return (
                        <div>
                            <div className="elemento">
                                <label className="identificador-elemento">{i+1}</label>
                                <div className="div-image-elemento">
                                    <img className="image-elemento" src={value.url} />
                                </div>
                                <label className="nombre-elemento">fondo.eldventir1.jpg</label>
                                <label className="peso-elemento">400 KB</label>
                                <img src="/img/tag.svg" className="img-tag"/>
                                <input className="input-tag" / >
                            </div>
                            <hr className="separador-elemento"/>
                        </div>
                    )
                }
            );

            personajes = this.state.imagenesPredefinidas.personajes.map(
                function iterator (value, i){
                    return (
                        <div>
                            <div className="elemento">
                                <label className="identificador-elemento">{i+1}</label>
                                <div className="div-image-elemento">
                                    <img className="image-elemento" src={value.url} />
                                </div>
                                <label className="nombre-elemento">fondo.eldventir1.jpg</label>
                                <label className="peso-elemento">400 KB</label>
                                <img src="/img/tag.svg" className="img-tag"/>
                                <input className="input-tag" / >
                            </div>
                            <hr className="separador-elemento"/>
                        </div>
                    )
                }
            );
        }

        var body ='';
        var btnStyle = this.state.restrictLabel ? {display:'none'} : {display:'initial'};

        if(this.state.view){
            body =
            <div className="body-story-teacher">
                <div className="general-instructions">
                    {this.state.generalInstructions}
                </div>
                <div>Instrucciones de la actividad</div>
                <textarea
                    type="textarea"
                    value={this.state.instructions}
                    onChange={handleChangeInstructions}
                    placeholder='Instrucciones ...'
                    id='instructions'
                    className={this.state.errors.instructions || "text-teacher-story"}
                    >
                </textarea>
                <label className="label-restrict">{'*'+this.state.restrict}</label>
                <div className="story-teacher">
                    <div className='elementos-div'>
                        <div className="div-seccion">
                            <div className="div-botones">
                                <div>Fondos </div>
                                <div>
                                <button className="btn-default-img" onClick={() => this.handleClickImagenes()}>Imagenes Predefinidas</button>
                                <button className="btn-add-img" onClick={() => this.handleClickSelecionar('fondos')}>Seleccionar imagen</button>
                                </div>
                             </div>
                            <div className="div-elementos">
                                {fondos}
                            </div>
                        </div>
                        <div className="div-seccion">
                            <div className="div-botones">
                                <label>Personajes </label>
                                <button className="btn-add-img" onClick={() => this.handleClickSelecionar('personajes')}>Seleccionar imagen</button>
                             </div>
                            <div className="div-elementos">
                                {personajes}
                            </div>
                        </div>
                        <div className="div-seccion">
                            <div className="div-botones">
                                <label>Objetos </label>
                                <button className="btn-add-img" onClick={() => this.handleClickSelecionar('objetos')}>Seleccionar imagen</button>
                             </div>
                            <div className="div-elementos">
                                {objetos}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <button onClick={() => this.handleClickInit()} className="button-reset">Volver a empezar</button>
                    <button onClick={() => this.handleClickFinish()} className="button-terminar">Terminar</button>
                </div>
            </div>
        }else{
            // var btnStyle = this.state.restrictLabel ? {display:'none'} : {display:'initial'};
            var handleAdd = this.handleAdd;
            var imagenes = this.state.imagenes.map(
                function iterator (value, i){
                    return (
                        <div className="div-image-upload">

                            <input type="checkbox" className="radio-naranja" name='imagenes' id={i} onClick={handleAdd}/>
                            <label htmlFor={i}></label>
                            <img className="image-upload" src={value.url} />
                        </div>
                    )
                }
            );
            var handleDelete=this.handleDelete;
            var imagenesUpload = this.state.files.map(
                function iterator (file, i){
                    return (
                        <div>
                            <div key={i}>{file.name}
                                <img src='/img/tache.svg' id={'img-'+i} className="img-borrar" onClick={this.handleDelete}/>
                            </div>
                        </div>
                    )
                }
            )

            body =
                <div className="body-story-images">
                    <div className="general-instructions">
                        {this.state.generalInstructions}
                    </div>
                    <div>
                        <div className="subir-imagenes">

                            <DragAndDrop handleDrop={this.handleDrop}>
                              <div>
                                { imagenesUpload }
                              </div>
                            </DragAndDrop>

                        </div>
                        <label className="col-12 max-img" style={btnStyle}>{this.state.restrict}</label>
                        <div className="imagenes-div">
                            {imagenes}
                        </div>
                    </div>
                    <div className='buttons-images'>
                        <button onClick={() => this.handleClickCancel()} className="button-cancelar">Cancelar</button>
                        <button onClick={() => this.handleClickSelecionar()} className="button-aceptar">Seleccionar</button>
                    </div>
                </div>
        }

        return(
            <div>
                { body }
            </div>
        )
    }
}

export default StoryStudent;
