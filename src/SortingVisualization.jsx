import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SortingVisualization.css';

class SortingVisualization extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: this.createRows(),
    };

    this.sort = this.sort.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  sort() {
    this.props.sort(this.state.rows, this.updateState);
  }

  updateState(newRows) {
    this.setState({ rows: newRows });
  }

  generateRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  createRow() {
    const rowState = [];
    for (let i = 0; i < 100; i++) {
      rowState.push(this.generateRandomColor());
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
    return (
      <div className="visualization">
        <button className="sortButton" onClick={this.sort}>Sort!</button>
        {this.state.rows.map((row, rowIndex) => {
          return (<div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => <span className="cell" key={cellIndex} style={{backgroundColor: cell}} />)}
          </div>);
        })}
      </div>
    );
  }
};

SortingVisualization.propTypes = {
  sort: PropTypes.func.isRequired,
};

export default SortingVisualization;
