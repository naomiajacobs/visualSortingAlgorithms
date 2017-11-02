let temp, callback, rows;
let stillSwapping = true;
let swappingAt = 0;
let madeSwap = false;

function swap(row, indexA, indexB) {
  temp = row[indexB];
  row[indexB] = row[indexA];
  row[indexA] = temp;
}

function extractHue(hslString) {
  return +hslString.split(',')[0].substring(4);
}

function swapAtIndexIfNeeded(row) {
  const first = extractHue(row[swappingAt]);
  const second = extractHue(row[swappingAt + 1]);
  if (second > first) {
    swap(row, swappingAt, swappingAt + 1);
    madeSwap = true;
  }
}

function sortStep() {
  rows.forEach(swapAtIndexIfNeeded);

  if (swappingAt === 48) {
    swappingAt = 0;
    if (!madeSwap) {
      stillSwapping = false;
    } else {
      madeSwap = false;
    }
  } else {
    swappingAt++;
  }

  callback(rows);
}

function bubble(inputRows, updateCB) {
  rows = inputRows;
  callback = updateCB;

  while(stillSwapping) { sortStep(); }
}

export default {
  bubble,
};
