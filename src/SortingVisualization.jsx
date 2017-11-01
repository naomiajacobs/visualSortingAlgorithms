import React, { Component } from 'react';
import './SortingVisualization.css';

class SortingVisualization extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: this.createRows(),
    };
  }

  generateColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  createRow() {
    const rowState = [];
    for (let i = 0; i < 100; i++) {
      rowState.push(this.generateColor());
    }
    return rowState;
  }

  createRows() {
    const rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push(this.createRow());
    }
    return rows;
  }

  render() {
    return (<div className="visualization">
      {this.state.rows.map((row, rowIndex) => {
        return (<div className="row" key={rowIndex}>
          {row.map((cell, cellIndex) => <span className="cell" key={cellIndex} style={{backgroundColor: cell}} />)}
        </div>);
      })}
    </div>);
  }
};

export default SortingVisualization;
