let temp, swappingAt, callback, rows;

function swap(row, indexA, indexB) {
  temp = row[indexB];
  row[indexB] = row[indexA];
  row[indexA] = temp;
}

function stillSwapping() {
  return rows.filter(row => !row.finishedSorting).length;
}

function sortStep() {
  rows.forEach((rowData) => {
    if (rowData.finishedSorting) { return; }

    const { row } = rowData;
    const first = row[swappingAt];
    const second = row[swappingAt + 1];
    if (second > first) {
      swap(row, swappingAt, swappingAt + 1);
      rowData.madeSwap = true;
    }

    if (swappingAt === 99) {
      if (!row.madeSwap) {
        rowData.finishedSorting = true;
      } else {
        row.madeSwap = false;
      }
    }
  });

  if (swappingAt === 99) {
    swappingAt = 0;
  } else {
    swappingAt++;
  }

  callback(rows.map(rowData => rowData.row));

  if (stillSwapping(rows)) {
    setTimeout(() => sortStep(), 0);
  }
}

function bubbleSort(inputRows, updateCB) {
  rows = inputRows.map(row => {
    return {
      madeSwap: false,
      finishedSorting: false,
      row: row,
    };
  });

  swappingAt = 0;
  callback = updateCB;

  sortStep();
}

export default {
  bubbleSort,
};
