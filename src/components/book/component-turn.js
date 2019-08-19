import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import "turn.js";
import "./styles.css";

class Turn extends React.Component {
  static defaultProps = {
    style: {},
    className: "",
    options: {},
    change: ''
  };

  componentDidMount() {
    if (this.el) {
      $(this.el).turn(Object.assign({}, this.props.options));
    }
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    if (this.el) {
      $(this.el)
        .turn("destroy")
        .remove();
    }
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }
  handleKeyDown = event => {
      console.log('jhjhhhhhhhhhhhhhhhhhhhhh')
    if (event.keyCode === 37) {
      $(this.el).turn("previous");
    }
    if (event.keyCode === 39) {
      $(this.el).turn("next");
    }
  };

  render() {
    return (
      <div
        className={this.props.className}
        ref={el => (this.el = el)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Turn;
