import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CuestionarioTeacher extends Component {
    constructor(props) {
        super(props);
        /*Borra pregunta*/
        this.handleClickDelete =id => {
            if (this.state.questions.length > 1){
                var question=[];
                this.state.questions.map((item, i) =>{
                    if (i != id.currentTarget.id){
                        question.push(item);
                    }
                });
                // this.setState({questions:question})
                console.log(question);
                // this.setState({questions:[{
                //     type:2,
                //     question:'¿............?',
                //     options: [
                //         'Amazonas',
                //         'Amazonasssss',
                //         'oooo',
                //     ],
                // }]})
                this.setState({questions:question})
                this.setState({questions:question}, () => {
                    console.log(this.state.questions);
                });
                // this.forceUpdate();
                // console.log(this.state.questions);
            }
        };
        /*Borra opcion*/
        this.handleClickDeleteOption =id => {
            var ids=id.currentTarget.id.split('-');
            if (ids[1] > 1){
                var questions=this.state.questions;
                var options=[];
                this.state.questions.map((value, i) =>{
                    if(i == ids[0] ){
                        value.options.map((option, j) =>{
                            if (j != ids[1]){
                                options.push(option);
                            }
                        });
                        questions[i].options = options;
                    }
                });
                this.setState({questions:questions});
            }
        };
        /*Pinta opciones*/
        this.createOptions = values => {
             var options = values.map((value, i) =>{
                // console.log(value);

            });
            return <div>hola</div>;

        }
        /*Change en pregunta*/
        this.handleChangeEventQuestion = value => {
            var index =value.currentTarget.id.split('-')[1];
            var questions=this.state.questions
            questions[index].question= value.currentTarget.value;
            this.setState({questions:questions})
        }
        /**Change opciones*/
        this.handleChangeEventOption = value => {
            var i =value.currentTarget.id.split('-')[1];
            var j =value.currentTarget.id.split('-')[2];
            var questions=this.state.questions;
            questions[i].options[j]= value.currentTarget.value;
            this.setState({questions:questions});
        }
        /*this state*/
        this.state={
            questions:[
                {
                    type:1,
                    question:'¿Cuál es el río más largo del mundo?',
                    options: [
                        'Misisipi',
                        'Amazonas',
                        'Nilo',
                        'Amazonasssss',
                        'oooo',
                        'Ninguno',
                    ],
                }
            ],
        }

    }

    createDivs(){
        // var click = this.handleClickDelete;
        // var opciones = this.createOptions;
        // var deleteOption = this.handleClickDeleteOption;
        // var handleChangeEventQuestion = this.handleChangeEventQuestion;
        // var handleChangeEventOption = this.handleChangeEventOption;
        // this.state.divs = this.state.questions.map(
        //     function iterator (value, i){
        //         var style = i >0 ? {display:'block'} : {display:'none'};
        //         var options = value.options.map(
        //            function iterator (option, j){
        //                var styleOption = j > 1 ? {display:'block'} : {display:'none'};
        //                return(
        //                     <div className="option">
        //                         <input
        //                             defaultValue={option}
        //                             type="text"
        //                             id={'option-'+i+'-'+j}
        //                             className="question-option"
        //                             onChange={handleChangeEventOption}
        //                         />
        //                         <button className="div-delete-option" id={i+'-'+j} style={styleOption} onClick={deleteOption}></button>
        //                     </div>
        //                );
        //            }
        //         );
        //         return(
        //             <div className="question-admin">
        //                 <div className="div-question">
        //                     <div>Pregunta {i+1}</div>
        //                     <input
        //                         defaultValue={value.question}
        //                         onChange={handleChangeEventQuestion}
        //                         type="text"
        //                         className="question-text-admin"
        //                         id={'question-'+i}
        //                     />
        //                     <div className="type-question">
        //                         <div><input type="radio"  value="3" name={i} className="radio" checked/>Respuesta abierta</div>
        //                         <div><input type="radio"  value="2" name={i} className="radio" />Opcion multiple</div>
        //                         <div><input type="radio"  value="1" name={i} className="radio" />Selección</div>
        //                     </div>
        //                     <div className="questions-options" id={"divOpciones-"+i}>
        //                         {options}
        //                     </div>
        //                 </div>
        //                 <button className="div-delete" onClick={click} id={i} style={style}></button>
        //             </div>
        //         );
        //     }
        // );
    }

    handleClick() {
        var questions = this.state.questions;
        questions.push({type:1, question:'', options:[]});
        this.setState({questions:questions});
        console.log(this.state.questions);
    }

    render(){
        console.log('render ...');
        console.log(this.state.questions)
        var click = this.handleClickDelete;
        var opciones = this.createOptions;
        var deleteOption = this.handleClickDeleteOption;
        var handleChangeEventQuestion = this.handleChangeEventQuestion;
        var handleChangeEventOption = this.handleChangeEventOption;
        var divs = this.state.questions.map(
            function iterator (value, i){
                var style = i >0 ? {display:'block'} : {display:'none'};
                var options = value.options.map(
                   function iterator (option, j){
                       console.log(option)
                       var styleOption = j > 1 ? {display:'block'} : {display:'none'};
                       return(
                            <div className="option">
                                <input
                                    value={option}
                                    onChange={handleChangeEventOption}
                                    type="text"
                                    id={'option-'+i+'-'+j}
                                    className="question-option"
                                />
                                <button className="div-delete-option" id={i+'-'+j} style={styleOption} onClick={deleteOption}></button>
                            </div>
                       );
                   }
                );
                return(
                    <div className="question-admin">
                        <div className="div-question">
                            <div>Pregunta {i+1}</div>
                            <input
                                // value={value.question}
                                value={value.question}
                                onChange={handleChangeEventQuestion}
                                type="text"
                                className="question-text-admin"
                                id={'question-'+i}
                            />
                            <div className="type-question">
                                <div><input type="radio"  value="3" name={i} className="radio" checked/>Respuesta abierta</div>
                                <div><input type="radio"  value="2" name={i} className="radio" />Opcion multiple</div>
                                <div><input type="radio"  value="1" name={i} className="radio" />Selección</div>
                            </div>
                            <div className="questions-options" id={"divOpciones-"+i}>
                                {options}
                            </div>
                        </div>
                        <button className="div-delete" onClick={click} id={i} style={style}></button>
                    </div>
                );
            }
        );





        return(
            <div className="body-cuestionario-teacher">
                <div>Instrucciones de la actividad</div>
                <input type="text" className="text-teacher" />
                <div className="header-btn">
                    <div>
                        <label>Preguntas</label><br />
                        <label className="letter-red">*El minimo de preguntas es 1.</label>
                    </div>
                    <button onClick={() => this.handleClick()} className="button-agregar">+Agregar pregunta</button>
                </div>
                <div>
                    {divs}
                </div>
            </div>
        );
    }
}

export default CuestionarioTeacher;
