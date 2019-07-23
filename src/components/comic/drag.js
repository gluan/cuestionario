import React, { Component } from 'react';
import './x.css';
import './dragDrop';

export default class AppDragDropDemo extends Component {
    state = {
        tasks: [
            {name:"atardecer",category:"wip", image:'/img/elementos/fondos/atardecer.jpg'},
            {name:"cabaña", category:"wip", image:'/img/elementos/fondos/cabaña.jpg'},
            {name:"castillo-dia", category:"wip", image:'/img/elementos/fondos/castillo-dia.jpg'}
          ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        console.log('onDrop');
        console.log(cat)
        console.log(ev)
       let id = ev.dataTransfer.getData("id");
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

    render() {
        var tasks = {
            wip: [],
            complete: []
        }

        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <img key={t.name}
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable "
                    src={t.image}
                />
            );
        });

        return (
            <div className="container-drag">
                <div className="wip"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wip")}}
                    >
                    {tasks.wip}
                </div>
                <div className="droppable"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     {tasks.complete}
                </div>
            </div>
        );
    }
}
