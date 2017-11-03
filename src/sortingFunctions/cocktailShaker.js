import utils from './utils';

let callback, rows, didSwap, frontIndex, backIndex, nextMethod;
let stillSwapping = true;
let madeSwap = false;

function swapForward(row) {
  const first = utils.extractHue(row[frontIndex]);
  const second = utils.extractHue(row[frontIndex + 1]);
  if (second > first) {
    utils.swap(row, frontIndex, frontIndex + 1);
    return true;
  }
}

function swapBackward(row) {
  const first = utils.extractHue(row[backIndex]);
  const second = utils.extractHue(row[backIndex - 1]);
  if (second < first) {
    utils.swap(row, backIndex, backIndex - 1);
    return true;
  }
}

function iterateOnRow(row, method) {
  didSwap = method(row);
  if (!madeSwap && didSwap) { madeSwap = true; }
}

function iterateForward(row) {
  iterateOnRow(row, swapForward);
}

function iterateBackward(row) {
  iterateOnRow(row, swapBackward);
}

function cleanupSwapVariables() {
  if (!madeSwap) {
    stillSwapping = false;
  } else {
    madeSwap = false;
  }
}

function cleanupForward() {
  if (frontIndex === backIndex) {
    frontIndex = rows.length - backIndex - 1;
    cleanupSwapVariables();
    nextMethod = iterateBackward;
  } else {
    frontIndex++;
  }
}

function cleanupBackward() {
  if (backIndex === frontIndex) {
    backIndex = rows.length - frontIndex - 1;
    cleanupSwapVariables();
    nextMethod = iterateForward;
  } else {
    backIndex--;
  }
}

function cleanup(method) {
  method === iterateForward ? cleanupForward() : cleanupBackward();
}

function sortStep(method) {
  console.log(`frontIndex: ${frontIndex}`);
  console.log(`backIndex: ${backIndex}`);
  rows.forEach(method);
  callback(rows);

  cleanup(method);

  if (stillSwapping) { setTimeout(() => sortStep(nextMethod), 0); }
}

function cocktailShaker(inputRows, updateCB) {
  rows = inputRows;
  callback = updateCB;
  frontIndex = 0;
  backIndex = rows.length - 2;
  nextMethod = iterateForward;
  sortStep(nextMethod);
}

export default cocktailShaker;
