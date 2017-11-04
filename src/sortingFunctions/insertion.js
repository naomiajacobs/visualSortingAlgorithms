import utils from './utils';

let extractColorVariable;

function extractRows(rowData) {
  return rowData.map(data => data.row);
}

function setupRow(rowData, index) {
  rowData.temp = rowData.row[index]; // set aside variable for this iteration
  rowData.inserting = true; // set each row to be currently inserting
}

function firstLessThanSecond(first, second) {
  return extractColorVariable(first) <= extractColorVariable(second);
}

function sortStep(rowsData, callback) {
  for (let i = 1; i < rowsData.length; i++) { // index 0 is considered the sorted section at start
    rowsData.forEach((rowData) => setupRow(rowData, i));

    let current = i - 1;
    let rowsStillInserting = rowsData;
    while (current >= 0 && rowsStillInserting.length) {
      rowsStillInserting.forEach(rowData => {
        if (firstLessThanSecond(rowData.temp, rowData.row[current])) {
          rowData.row[current + 1] = rowData.row[current];
        } else {
          rowData.inserting = false;
        }
      });
      rowsData.forEach(rowData => {
        if (rowData.inserting) {
          rowData.row[current] = rowData.temp;
        }
      });
      callback(extractRows(rowsData));
      current--;
      rowsStillInserting = rowsData.filter(rowData => rowData.inserting);
    };
  }
}

function insertion(inputRows, updateCB, sortBy) {
  extractColorVariable = utils.extractColorVariable.bind(null, sortBy);
  let rows = inputRows.map(row => { return { row }; });
  const callback = updateCB;

  sortStep(rows, callback, );
}

export default insertion;
