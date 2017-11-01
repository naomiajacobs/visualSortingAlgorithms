import React, { Component } from 'react';
import './App.css';
import SortingVisualization from './SortingVisualization';
import sortingFunctions from './sortingFunctions';

class App extends Component {
  constructor() {
    super();
    this.state = { sortingMethod: 'bubble' }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log(event.target.value);
    this.setState({ sortingMethod: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Visual Sorting Algorithms</h1>
        </header>
        <div className="options">
          <select onChange={this.onChange} >
            <option value="bubble">Bubble</option>
          </select>
        </div>
        <SortingVisualization sort={sortingFunctions[this.state.sortingMethod]} />
      </div>
    );
  }
}

export default App;
