import React, { Component } from 'react';

import './book.css';
import Instructions from '../book/book';

class Book extends Component {
    handleChange (event) {
        var text = event.target.value
        if(event.target.value.length >= 20){
            var component = document.getElementById("page-2");
            component.focus();
        }
    };

    handleChangePage (event) {
        var text = event.target.value;
        if(event.target.value == 0){
            var component = document.getElementById("page-1");
            component.focus();
        }
    };

    render() {
        return(
            <div className="row col-12">
                <Instructions />
                <div className="col-6 page">
                    <textarea
                        id="page-1"
                        placeholder="Type here ..."
                        onChange={this.handleChange.bind(this)}>
                    </textarea>
                </div>
                <div className="col-6 page">
                    <textarea
                        id="page-2"
                        onChange={this.handleChangePage.bind(this)}>
                    </textarea>
                </div>
            </div>
        );
    }
}

export default Book;
