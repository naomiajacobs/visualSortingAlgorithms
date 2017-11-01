import React, { Component } from 'react';
import './App.css';
import SortingVisualization from './SortingVisualization';
import sortingFunctions from './sortingFunctions';

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
        <SortingVisualization sort={sortingFunctions.bubbleSort} />
      </div>
    );
  }
}

export default App;
