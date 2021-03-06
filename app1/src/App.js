import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoContainer} from "./TodoContainer";
import {FullWindowLine, HalfWindowLine} from "./HoCSample";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <FullWindowLine color={"red"} />
        <HalfWindowLine color={"green"} />
        <TodoContainer />
      </div>
    );
  }
}

export default App;
