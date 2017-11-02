import utils from './utils';

let temp, callback, rows;
let stillSwapping = true;
let swappingAt = 0;
let madeSwap = false;

function swapAtIndexIfNeeded(row) {
  const first = utils.extractHue(row[swappingAt]);
  const second = utils.extractHue(row[swappingAt + 1]);
  if (second > first) {
    utils.swap(row, swappingAt, swappingAt + 1);
    return true;
  }
}

function iterateOnRow(row) {
  const didSwap = swapAtIndexIfNeeded(row);
  if (!madeSwap && didSwap) { madeSwap = true; }
}

function sortStep() {
  rows.forEach(iterateOnRow);
  callback(rows);

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

  if (stillSwapping) { setTimeout(sortStep, 0); }
}

function bubble(inputRows, updateCB) {
  rows = inputRows;
  callback = updateCB;

  sortStep();
}

export default bubble;
