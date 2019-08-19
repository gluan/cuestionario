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
            restrictLabel:false,
            files: [],
            filesURL: [],
            imagesUpload:[],
            view:true,
            predefinidas: false,
            restrict:'El máximo de elementos que puedes agregar por sección son 10.',
            generalInstructions:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore'+
            ' magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            errors:{
                instructions:null,
                fondos:null,
                personajes: null,
                objetos:null,
                fondosTag:[],
                personajesTag: [],
                objetosTag:[]
            },
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
            nuevasImagenes: {},
            imagenes:[],
        }
        this.handleAdd= value =>{
            var images = this.state.imagenes;
            var imagesUpload=this.state.imagesUpload;
            var count = this.state.imgSelect;

            /* Click en imagen */
            if (value.currentTarget.dataset.inputid){
                let idAll = value.currentTarget.dataset.inputid;
                var id = value.currentTarget.dataset.inputid;

                if(id.split('-').length == 1){
                    id = id.split('-')[0];
                    var restrictLabel=false;
                    images[id].isAdd= !images[id].isAdd;

                    if (images[id].isAdd){
                        count++;
                        document.getElementById(idAll).checked=true;
                    }else{
                        count--;
                        document.getElementById(idAll).checked=false;
                    }

                    if (count > maxImg){
                        count=maxImg
                        images[id].isAdd= false
                        document.getElementById(idAll).checked=false;
                        restrictLabel=true;
                    }

                }else{
                    id = id.split('-')[1];
                    let checked = document.getElementById(idAll).checked;
                    if (!checked){
                        count++;
                        if (count > maxImg){
                            count  =maxImg
                            document.getElementById(idAll).checked=false;
                            restrictLabel=true;
                        }else{
                            document.getElementById(idAll).checked=true;
                            imagesUpload.push({
                                file:this.state.files[id],
                                url: this.state.filesURL[id],
                                isAdd:true,
                            });
                        }
                    }else{
                        count--;
                        document.getElementById(idAll).checked=false;
                        imagesUpload.map((item) => {
                            if (item.file == this.state.files[id]){
                                item.isAdd = false;
                            }
                        });
                    }
                }


            /* Click en radio */
            }else {
                var id = value.target.id;

                if(id.split('-').length == 1){
                    id = id.split('-')[0];
                    images[id].isAdd= value.target.checked;
                    var restrictLabel=false;
                    if (value.target.checked)
                        count++;
                    else{
                        count--;
                    }

                    if (count > maxImg){
                        count=maxImg
                        images[id].isAdd= false
                        document.getElementById(value.target.id).checked=false;
                        restrictLabel=true;
                    }

                }else{
                    id = id.split('-')[1];
                    if (value.target.checked){
                        count++;
                        if (count > maxImg){
                            count  =maxImg
                            document.getElementById(value.target.id).checked=false;
                            restrictLabel=true;
                        }else{
                            imagesUpload.push({
                                file:this.state.files[id],
                                url: this.state.filesURL[id],
                                isAdd:true,
                            });
                        }
                    }else{
                        count--;
                        imagesUpload.map((item) => {
                            if (item.file == this.state.files[id]){
                                item.isAdd = false;
                            }
                        });
                    }
                }
            }
            this.setState({
                imagenes:images,
                restrictLabel:restrictLabel,
                imgSelect: count,
                imagesUpload:imagesUpload,
            })
        }
        this.handleEditTag = (e) => {
            console.log('Add tag')
            console.log(e)
            console.log(e.currentTarget)
            let id = e.currentTarget.id.split('-');
            let imagenes = this.state.nuevasImagenes;
            if(id[1] == 'fondos')
                imagenes.fondos[id[2]].tag = e.currentTarget.value;
            if(id[1] == 'personajes')
                imagenes.personajes[id[2]].tag = e.currentTarget.value;
            if(id[1] == 'objetos')
                imagenes.objetos[id[2]].tag = e.currentTarget.value;
            this.setState({nuevasImagenes: imagenes})
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
        var errors= {
            error:false,
            fondosTag:[],
            personajesTag: [],
            objetosTag:[]
        };
        if (this.state.instructions == null || this.state.instructions == '' || this.state.instructions == ' '){
            errors.instructions = 'text-teacher-story error-story';
            errors.error=true;
        }else {
            errors.instructions = null;
        }
        if (this.state.nuevasImagenes.fondos.length == 0){
            errors.fondos = 'div-elementos error-story';
            errors.error=true;
        }else {
            errors.fondos = null;
            this.state.nuevasImagenes.fondos.map((item, i) =>{
                if(!item.tag){
                    errors.error=true;
                    errors.fondosTag.push('input-tag error-story');
                }else{
                    errors.fondosTag.push(null);
                }
            })
        }
        if (this.state.nuevasImagenes.personajes.length == 0){
            errors.personajes = 'div-elementos error-story';
            errors.error=true;
        }else {
            errors.personajes = null;
            this.state.nuevasImagenes.personajes.map((item, i) =>{
                if(!item.tag){
                    errors.error=true;
                    errors.personajesTag.push('input-tag error-story');
                }else{
                    errors.personajesTag.push(null);
                }
            })
        }
        if (this.state.nuevasImagenes.objetos.length == 0){
            errors.objetos = 'div-elementos error-story';
            errors.error=true;
        }else {
            errors.objetos = null;
            this.state.nuevasImagenes.objetos.map((item, i) =>{
                if(!item.tag){
                    errors.error=true;
                    errors.objetosTag.push('input-tag error-story');
                }else{
                    errors.objetosTag.push(null);
                }
            })
        }
        this.setState({errors:errors});
    }
    /*Finalizar cuestionario*/
    handleClickFinish(){
            this.validate();
            console.log(this.state);
            if(this.state.errors.error)
                console.log('enviar datos ....');
            else
                console.log('error ....');
    }
	/*Reiniciar cuestionario*/
    handleClickInit(){
        this.setState({
            instructions:'',
            nuevasImagenes:Object.assign({}, this.state.imagenesPredefinidas),
            imagesUpload:[],
            imagenes:[],
            imgSelect: 0,
            restrictLabel:false,
            files: [],
            view:true,
            predefinidas: false,
            errors:{
                error:false,
                instructions:null,
                fondos:null,
                personajes: null,
                objetos:null,
                fondosTag:[],
                personajesTag: [],
                objetosTag:[]
            },
        });
    }
    /*Imagenes predefinidas*/
    handleClickImagenes(){
        this.setState({
            predefinidas: true,
            nuevasImagenes: Object.assign({}, this.state.imagenesPredefinidas)
        });
    }
    handleClickSelecionar(e){
        var imagenes=[];
        var imgSelect = 0;
        /*TODO: Cambiarlo por imagenes que regrese el servicio de galerio*/
        if (e=='fondos'){
            imagenes = JSON.parse(JSON.stringify(this.state.imagenesPredefinidas.fondos));
            imgSelect= this.state.nuevasImagenes.fondos.length;
        }else if(e == 'personajes'){
            imagenes = JSON.parse(JSON.stringify(this.state.imagenesPredefinidas.personajes));
            imgSelect= this.state.nuevasImagenes.personajes.length;
        }else{
            imagenes = JSON.parse(JSON.stringify(this.state.imagenesPredefinidas.objetos));
            imgSelect= this.state.nuevasImagenes.objetos.length;
        }
        imagenes.map((item, i) =>{
            imagenes[i].isAdd=false;
        });
        this.setState({
            imgSelect: imgSelect,
            select:e,
            predefinidas:false,
            imagenes: imagenes,
            view: false,
        });
    }
    handleClickSelecionarAccept(e){
        var imagenes = this.state.imagenes;
        var img =  this.state.nuevasImagenes;
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

    componentWillMount() {
        console.log('njnjnjnjn')
        this.setState({
            nuevasImagenes:JSON.parse(JSON.stringify(this.state.imagenesPredefinidas)),
        });
    }

    render(){
        console.log('Render ...................')
        console.log(this.state);
        var errors =this.state.errors;
        var btnStyleDefault = this.state.btn ? {display:'initial'} : {display:'none'};
        var btnStyleImg = this.state.btn ? {display:'none'} : {display:'initial'};
        var btnStyleDef = this.state.predefinidas ? {display:'none'} : {display:'initial'};
        var handleChangeInstructions = this.handleChangeInstructions;
        var handleEditTag = this.handleEditTag;
        var errors = this.state.errors;
        var fondos = [];
        var objetos = [];
        var personajes = [];
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
                            <input id={'new-fondos-'+i} onChange={handleEditTag} value={value.tag}
                                className={errors.fondosTag[i] ? errors.fondosTag[i] : "input-tag"} />
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
                            <input id={'new-objetos-'+i} onChange={handleEditTag} value={value.tag}
                                className={errors.objetosTag[i] ? errors.objetosTag[i] : "input-tag"} />
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
                            <input id={'new-personajes-'+i} onChange={handleEditTag} value={value.tag}
                                className={errors.personajesTag[i] ? errors.personajesTag[i] : "input-tag"} />
                            <img className="image-elemento-bote" src='/img/bote.svg' name={'personajes-'+i}
                                onClick={handleClickDeleteImage}/>
                        </div>
                        <hr className="separador-elemento"/>
                    </div>
                )
            }
        );
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
                                <button className="btn-default-img" onClick={() => this.handleClickImagenes()}>Imagenes Predefinidas</button>
                                <button
                                    className={!(this.state.nuevasImagenes.fondos.length < maxImg) ? "btn-add-img-inactive": "btn-add-img"}
                                    onClick={() => this.handleClickSelecionar('fondos')}
                                    disabled = {this.state.nuevasImagenes.fondos.length >= maxImg}
                                >Seleccionar imagen</button>
                                </div>
                             </div>
                            <div className={this.state.errors.fondos ? this.state.errors.fondos : "div-elementos"}>
                                {fondos}
                            </div>
                        </div>
                        <div className="div-seccion">
                            <div className="div-botones">
                                <label>Personajes </label>
                                <button
                                    className={!(this.state.nuevasImagenes.personajes.length < maxImg) ? "btn-add-img-inactive": "btn-add-img"}
                                    onClick={() => this.handleClickSelecionar('personajes')}
                                    disabled = {this.state.nuevasImagenes.personajes.length >= maxImg}
                                >Seleccionar imagen</button>
                             </div>
                            <div className={this.state.errors.personajes ? this.state.errors.personajes : "div-elementos"}>
                                {personajes}
                            </div>
                        </div>
                        <div className="div-seccion">
                            <div className="div-botones">
                                <label>Objetos </label>
                                <button
                                    className={!(this.state.nuevasImagenes.objetos.length < maxImg) ? "btn-add-img-inactive": "btn-add-img"}
                                    onClick={() => this.handleClickSelecionar('objetos')}
                                    disabled = {this.state.nuevasImagenes.objetos.length >= maxImg}
                                >Seleccionar imagen</button>
                             </div>
                            <div className={this.state.errors.objetos ? this.state.errors.objetos : "div-elementos"}>
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
                            <img data-inputId={'i-'+i} className="image-upload" src={value} onClick={handleAdd}/>
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
                            <img data-inputId={i} className="image-upload" src={value.url} onClick={handleAdd}/>
                        </div>
                    )
                }
            );
            var handleDelete=this.handleDelete;
            body =
                <div className="body-story-images">
                    <div className="general-instructions">
                        {this.state.generalInstructions}
                    </div>
                    <div>
                        <div className="subir-imagenes">
                            <DragAndDrop handleDrop={this.handleDrop}>
                                <div className='col-12 text-center'>
                                    Arrastrar Archivo
                                </div>
                                <label for="file-input" class="input-file">
                                    Subir Archivo
                                </label>
                                <input
                                    className="input-file"
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
                            <div className="imagenes-div-dos">
                                { newimagenes }
                                { imagenes }
                            </div>
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
