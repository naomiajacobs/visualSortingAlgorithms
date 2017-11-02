let temp;

function swap(row, indexA, indexB) {
  temp = row[indexB];
  row[indexB] = row[indexA];
  row[indexA] = temp;
}

function extractHue(hslString) {
  return +hslString.split(',')[0].substring(4);
}

export default {
  swap,
  extractHue,
};
