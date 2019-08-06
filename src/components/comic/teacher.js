import React, { Component } from 'react';
import './comic.css';
import StoryTeacherImage from './teacherImage';
import DragAndDrop from './DragDrop';
const maxImg = 10;

class StoryStudent extends Component{
    constructor(props){
        super(props);
        /*Cambios en instrucciones*/
        this.handleChangeInstructions = value => {
            this.setState({instructions: value.currentTarget.value});
        }
        /*this state*/
        this.state = {
            imgSelect: 0,
            // imgFaltan:maxImg,
            restrictLabel:false,
            files: [],
            filesURL: [],
            imagesUpload:[],
            view:true,
            predefinidas: false,
            restrict:'El máximo de elementos que puedes agregar por sección son 10.',
            generalInstructions:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore'+
            ' magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            errors:{},
            instructions:'',
            /*Cambiarlo por imagenes que regrese el servicio de imagenes predefinidas*/
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
            },
            nuevasImagenes:{
                fondos:[],
                objetos:[],
                personajes: []
            },
            imagenes:[],
        }
        this.handleAdd= value =>{
            console.log('----- handle add -----')
            var images = this.state.imagenes;
            var imagesUpload=this.state.imagesUpload;
            var id = value.target.id;
            var count = this.state.imgSelect;
            console.log('imagenes actuales '+ count)

            console.log(id)
            if(id.split('-').length == 1){
                id = id.split('-')[0];
                images[id].isAdd= value.target.checked;
                var restrictLabel=false;
                // images.map((item, key) =>{
                //     if(item.isAdd){
                //         count ++;
                //     }
                // });
                count++ ;
                if (count > maxImg){
                    count=maxImg
                    images[id].isAdd= false
                    document.getElementById(value.target.id).checked=false;
                    restrictLabel=true;
                }
            }else{
                id = id.split('-')[1];
                count ++;
                if (count > maxImg){
                    count=maxImg
                    document.getElementById(value.target.id).checked=false;
                    restrictLabel=true;
                }else{
                    var i = images.Upload.map((item, i) =>{
                        return item.url == this.state.filesURL[id] ? i : -1;
                    })
                    imagesUpload.push({
                        file:this.state.files[id],
                        url: this.state.filesURL[id],
                        isAdd:true,
                    });
                }
            }
            console.log('imagenes actuales despues'+ count)

            console.log('imagenes actuales despues ... '+ count)

            this.setState({
                imagenes:images,
                restrictLabel:restrictLabel,
                imgSelect: count,
                imagesUpload:imagesUpload,
            })
        }
        this.handleClickDeleteImage= (e) =>{
            var name = e.target.name.split('-')
            var imagenesAll = this.state.nuevasImagenes;
            var imagenes = []
            if (name[0]=='fondos'){
                this.state.nuevasImagenes.fondos.map((item, i) =>{
                    if(i != name[1]){
                        imagenes.push(item);
                    }
                })
                imagenesAll.fondos=imagenes
            }else if(name[0] == 'personajes'){
                this.state.nuevasImagenes.personajes.map((item, i) =>{
                    if(i != name[1]){
                        imagenes.push(item);
                    }
                })
                imagenesAll.personajes=imagenes
            }else{
                this.state.nuevasImagenes.objetos.map((item, i) =>{
                    if(i != name[1]){
                        imagenes.push(item);
                    }
                })
                imagenesAll.objetos=imagenes
            }
            this.setState({nuevasImagenes:imagenesAll});
        }
        this.handleDelete = event =>{
            console.log('borrar')
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
        if(!this.state.errors.error){
            //TODO: Enviar datos
            console.log('enviar datos ....');
            console.log(this.state);
        }
    }
	/*Reiniciar cuestionario*/
    handleClickInit(){
        this.setState({
            instructions:'',
            nuevasImagenes:{
                fondos:[],
                objetos:[],
                personajes: []
            },
            imagesUpload:[],
            imagenes:[],
            imgSelect: 0,
            // imgFaltan:maxImg,
            restrictLabel:false,
            files: [],
            view:true,
            predefinidas: false,
        });
    }
    /*Imagenes predefinidas*/
    handleClickImagenes(){
        this.setState({predefinidas:true,});
    }
    handleClickSelecionar(e){
        this.setState({files:[], filesURL:[], imagesUpload:[]})
        var imagenes=[];
        // var imgFaltan = 0;
        var imgSelect = 0;
        /*TODO: Cambiarlo por imagenes que regrese el servicio de galerio*/
        if (e=='fondos'){
            imagenes = this.state.imagenesPredefinidas.fondos;
            // imgFaltan = maxImg - this.state.nuevasImagenes.fondos.length;
            imgSelect= this.state.nuevasImagenes.fondos.length;
        }else if(e == 'personajes'){
            imagenes = this.state.imagenesPredefinidas.personajes;
            // imgFaltan = maxImg - this.state.nuevasImagenes.personajes.length;
            imgSelect= this.state.nuevasImagenes.personajes.length;
        }else{
            imagenes = this.state.imagenesPredefinidas.objetos;
            // imgFaltan = maxImg - this.state.nuevasImagenes.objetos.length;
            imgSelect= this.state.nuevasImagenes.objetos.length;
        }
        imagenes.map((item, i) =>{
            imagenes[i].isAdd=false;
        });
        this.setState({
            imgSelect: imgSelect,
            // imgFaltan: imgFaltan,
            select:e,
            predefinidas:false,
            imagenes: imagenes,
            view: false,
        });
    }
    handleClickSelecionarAccept(e){
        console.log('Aceptar ... ')
        var imagenes = this.state.imagenes;
        var img =  this.state.nuevasImagenes;
        console.log('imagenes');
        console.log(imagenes)

        var count = img.length;

        if (e == 'fondos'){
            imagenes.map((item) =>{
                if(item.isAdd){
                    img.fondos.push(item);
                }
            });
            this.state.imagesUpload.map((item) =>{
                if(item.isAdd){
                    img.fondos.push(item);
                }
            });
        }else if(e == 'personajes'){
            imagenes.map((item) =>{
                if(item.isAdd){
                    img.personajes.push(item);
                }
            });
            this.state.imagesUpload.map((item) =>{
                if(item.isAdd){
                    img.personajes.push(item);
                }
            });
        }else{
            imagenes.map((item) =>{
                if(item.isAdd){
                    img.objetos.push(item);
                }
            });
            this.state.imagesUpload.map((item) =>{
                if(item.isAdd){
                    img.objetos.push(item);
                }
            });
        }
        this.setState({view: true,nuevasImagenes:img});
    }

    handleClickCancel(){
        this.setState({view: true, restrictLabel:false})
    }
    handleDrop = (files) => {
        let fileList = this.state.files;
        var urls = this.state.filesURL;
        for (var i = 0; i < files.length; i++) {
            var url = URL.createObjectURL(files[i]);
            urls.push(url)
            fileList.push(files[i])
        }
        this.setState({files: fileList, filesURL:urls})
    }
    handleAddImages= (e) => {
        let fileList = this.state.files;
        var urls = this.state.filesURL;
        var files = document.getElementById(e).files;
        for (var i = 0; i < files.length; i++) {
            var url = URL.createObjectURL(files[i]);
            urls.push(url)
            fileList.push(files[i])
        }
        this.setState({files: fileList, filesURL:urls})
    }

    render(){
        console.log(this.state);
        var errors =this.state.errors;
        var btnStyleDefault = this.state.btn ? {display:'initial'} : {display:'none'};
        var btnStyleImg = this.state.btn ? {display:'none'} : {display:'initial'};
        var btnStyleDef = this.state.predefinidas ? {display:'none'} : {display:'initial'};
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
                                <input className="input-tag" />
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
        } else{
            var handleClickDeleteImage = this.handleClickDeleteImage;
            fondos = this.state.nuevasImagenes.fondos.map(
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
                                <img className="image-elemento-bote" src='/img/bote.svg' name={'fondos-'+i}
                                    onClick={handleClickDeleteImage}/>
                            </div>
                            <hr className="separador-elemento"/>
                        </div>
                    )
                }
            );

            objetos = this.state.nuevasImagenes.objetos.map(
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
                                <input className="input-tag" />
                                <img className="image-elemento-bote" src='/img/bote.svg' name={'objetos-'+i}
                                    onClick={handleClickDeleteImage}/>
                            </div>
                            <hr className="separador-elemento"/>
                        </div>
                    )
                }
            );

            personajes = this.state.nuevasImagenes.personajes.map(
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
                                <img className="image-elemento-bote" src='/img/bote.svg' name={'personajes-'+i}
                                    onClick={handleClickDeleteImage}/>
                            </div>
                            <hr className="separador-elemento"/>
                        </div>
                    )
                }
            );
        }

        var body ='';
        var btnStyle = this.state.restrictLabel ? {display:'initial'} : {display:'none'};

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
                                <button className={this.state.predefinidas ? "btn-default-img": "btn-default-img-inactive"} onClick={() => this.handleClickImagenes()}>Imagenes Predefinidas</button>
                                <button className={this.state.predefinidas ? "btn-add-img-inactive": "btn-add-img"} onClick={() => this.handleClickSelecionar('fondos')}>Seleccionar imagen</button>
                                </div>
                             </div>
                            <div className="div-elementos">
                                {fondos}
                            </div>
                        </div>
                        <div className="div-seccion">
                            <div className="div-botones">
                                <label>Personajes </label>
                                <button className={this.state.predefinidas ? "btn-add-img-inactive": "btn-add-img"} onClick={() => this.handleClickSelecionar('personajes')}>Seleccionar imagen</button>
                             </div>
                            <div className="div-elementos">
                                {personajes}
                            </div>
                        </div>
                        <div className="div-seccion">
                            <div className="div-botones">
                                <label>Objetos </label>
                                <button className={this.state.predefinidas ? "btn-add-img-inactive": "btn-add-img"} onClick={() => this.handleClickSelecionar('objetos')}>Seleccionar imagen</button>
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
            var handleAdd = this.handleAdd;
            var newimagenes = this.state.filesURL.map(
                function iterator (value, i){
                    return (
                        <div className="div-image-upload">
                            <input type="checkbox" className="radio-naranja" name='imagenes' id={'i-'+i} onClick={handleAdd}/>
                            <label htmlFor={'i-'+i}></label>
                            <img className="image-upload" src={value} />
                        </div>
                    )
                }
            );
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
                            <input className="input-file" name="file-input" id="file-input" type="file" />
                        {/*
                            <div key={i}>{file.name}
                                 <img src='/img/tache.svg' id={'img-'+i} className="img-borrar" onClick={handleDelete}/>
                            </div>
                        */}
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
                                <input
                                    name="file-input"
                                    id="file-input"
                                    type="file"
                                    multiple="true"
                                    onChange={() => this.handleAddImages('file-input')}
                                    accept="image/*"
                                    />
                            </DragAndDrop>

                        </div>
                        <label className="col-12 max-img" style={btnStyle}>{this.state.restrict}</label>
                        <div className="imagenes-div">
                            { newimagenes }
                            { imagenes }
                        </div>
                    </div>
                    <div className='buttons-images'>
                        <button onClick={() => this.handleClickCancel()} className="button-cancelar">Cancelar</button>
                        <button onClick={() => this.handleClickSelecionarAccept(this.state.select)} className="button-aceptar">Seleccionar</button>
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
