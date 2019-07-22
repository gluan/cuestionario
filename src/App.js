// Dependencies
import React, { Component } from 'react';
// Components
import Content from './components/Global/Content';

// import './App.css';

class App extends Component {

  render() {
    const { children } = this.props;
    return (
      <div >
        <Content body={ children }/>

      </div>
    );
  }
}

export default App;
