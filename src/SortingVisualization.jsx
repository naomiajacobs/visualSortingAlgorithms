import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { generateRandomColor } from './sortingFunctions/utils';
import './SortingVisualization.css';

class SortingVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createRows(props.sortBy),
    };

    this.sort = this.sort.bind(this);
    this.updateRows = this.updateRows.bind(this);
  }

  sort() {
    this.props.method(this.state.rows, this.updateRows, this.props.sortBy);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.method !== this.props.method || nextProps.sortBy !== this.props.sortBy) {
      this.setState({ rows: this.createRows(nextProps.sortBy) });
    }
  }

  updateRows(newRows) {
    this.setState({ rows: newRows });
  }

  createRow(sortBy) {
    const rowState = [];
    for (let i = 0; i < 50; i++) {
      rowState.push(generateRandomColor(sortBy));
    }
    return rowState;
  }

  createRows(sortBy) {
    const rows = [];
    for (let i = 0; i < 50; i++) {
      rows.push(this.createRow(sortBy));
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
  method: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default SortingVisualization;
