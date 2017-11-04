import React, { Component } from 'react';
import './App.css';
import SortingVisualization from './SortingVisualization';
import sortingFunctions from './sortingFunctions/index';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sortingMethod: 'bubble',
      sortBy: 'hue'
    };
    this.changeSortingMethod = this.changeSortingMethod.bind(this);
    this.changeSortBy = this.changeSortBy.bind(this);
  }

  changeSortingMethod(event) {
    this.setState({ sortingMethod: event.target.value });
  }

  changeSortBy(event) {
    this.setState({ sortBy: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Visual Sorting Algorithms</h1>
        </header>
        <div className="options-container">
          <div className="options">Sorting Method:
            <select onChange={this.changeSortingMethod} >
              <option value="bubble">Bubble</option>
              <option value="cocktailShaker">Cocktail Shaker</option>
            </select>
          </div>
          <div className="options">Sort By:
            <select onChange={this.changeSortBy} >
              <option value="hue">Hue</option>
              <option value="saturation">Saturation</option>
              <option value="lightness">Lightness</option>
            </select>
          </div>
        </div>
        <SortingVisualization
          method={sortingFunctions[this.state.sortingMethod]}
          sortBy={this.state.sortBy}
        />
      </div>
    );
  }
}

export default App;
