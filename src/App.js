import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SortingVisualization from './SortingVisualization';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Visual Sorting Algorithms</h1>
        </header>
        <div className="options">
          <button>Bubble Sort</button>
        </div>
        <SortingVisualization />
      </div>
    );
  }
}

export default App;
