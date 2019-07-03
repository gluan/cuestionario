import React, { Component } from 'react';

import './book.css';

class Book extends Component {
    handleChange (event) {
        var text = event.target.value;
        console.log(text)
        console.log(text.length)
        if(event.target.value.length >= 20){
            var component = document.getElementById("page-2");
            console.log(component);
            component.focus();
        }
    };

    handleChange2 (event) {
        var text = event.target.value;
        console.log(text)
        console.log(text.length)
        if(event.target.value == 0){
            var component = document.getElementById("page-1");
            console.log(component);
            component.focus();
        }
    };

    render() {
        return(
            <div className="row col-12">
                <div className="col-6 hoja">
                    <textarea
                        id="page-1"
                        placeholder="Type here ..."
                        onChange={this.handleChange.bind(this)}>
                    </textarea>
                </div>
                <div className="col-6 hoja">
                    <textarea
                        id="page-2"
                        onChange={this.handleChange2.bind(this)}>
                    </textarea>
                </div>
            </div>
        );
    }
}

export default Book;
