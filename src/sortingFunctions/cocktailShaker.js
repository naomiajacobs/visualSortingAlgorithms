import utils from './utils';

let callback, rows, didSwap, frontIndex, tempFrontIndex, backIndex, tempBackIndex, nextMethod;
let stillSwapping = true;
let madeSwap = false;

function swapForward(row) {
  const first = utils.extractHue(row[tempFrontIndex]);
  const second = utils.extractHue(row[tempFrontIndex + 1]);
  if (second > first) {
    utils.swap(row, tempFrontIndex, tempFrontIndex + 1);
    return true;
  }
}

function swapBackward(row) {
  const first = utils.extractHue(row[tempBackIndex]);
  const second = utils.extractHue(row[tempBackIndex - 1]);
  if (second < first) {
    utils.swap(row, tempBackIndex, tempBackIndex - 1);
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
  if (tempFrontIndex === backIndex) {
    tempBackIndex = backIndex;
    tempFrontIndex = frontIndex;
    backIndex--;
    cleanupSwapVariables();
    nextMethod = iterateBackward;
  } else {
    tempFrontIndex++;
  }
}

function cleanupBackward() {
  if (tempBackIndex === frontIndex + 1) {
    tempFrontIndex = frontIndex;
    tempBackIndex = backIndex;
    frontIndex++;
    cleanupSwapVariables();
    nextMethod = iterateForward;
  } else {
    tempBackIndex--;
  }
}

function cleanup(method) {
  method === iterateForward ? cleanupForward() : cleanupBackward();
}

function sortStep(method) {
  rows.forEach(method);
  callback(rows);

  cleanup(method);

  if (stillSwapping) { setTimeout(() => sortStep(nextMethod), 0); }
}

function cocktailShaker(inputRows, updateCB) {
  rows = inputRows;
  callback = updateCB;
  frontIndex = tempFrontIndex = 0;
  backIndex = tempBackIndex = rows.length - 2;
  nextMethod = iterateForward;
  sortStep(nextMethod);
}

export default cocktailShaker;
