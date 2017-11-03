import utils from './utils';

let callback, rows, endIndex, extractColorVariable;
let stillSwapping = true;
let swappingAt = 0;
let madeSwap = false;

function swapAtIndexIfNeeded(row) {
  const first = extractColorVariable(row[swappingAt]);
  const second = extractColorVariable(row[swappingAt + 1]);
  if (second > first) {
    utils.swap(row, swappingAt, swappingAt + 1);
    return true;
  }
}

function iterateOnRow(row) {
  const didSwap = swapAtIndexIfNeeded(row);
  if (!madeSwap && didSwap) { madeSwap = true; }
}

function cleanup() {
  if (swappingAt === endIndex) {
    swappingAt = 0;
    endIndex = endIndex === 0 ? 0 : endIndex - 1;
    if (!madeSwap) {
      stillSwapping = false;
    } else {
      madeSwap = false;
    }
  } else {
    swappingAt++;
  }
}

function sortStep() {
  rows.forEach(iterateOnRow);
  callback(rows);

  cleanup();

  if (stillSwapping) { setTimeout(sortStep, 0); }
}

function bubble(inputRows, updateCB, sortBy) {
  debugger
  extractColorVariable = utils.extractColorVariable.bind(null, sortBy);
  rows = inputRows;
  callback = updateCB;
  endIndex = rows.length - 2
  sortStep();
}

export default bubble;
