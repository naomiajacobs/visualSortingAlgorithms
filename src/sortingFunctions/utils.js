let temp;

function swap(row, indexA, indexB) {
  temp = row[indexB];
  row[indexB] = row[indexA];
  row[indexA] = temp;
}

function extractColorVariable(sortBy, hslString) {
  switch (sortBy) {
    case "hue":
      return +hslString.split(',')[0].substring(4);
    case "saturation":
      return +hslString.split(',')[1].slice(0, -2);
    case "lightness":
      return +hslString.split(',')[2].slice(0, -2);
    default:
      return +hslString.split(',')[0].substring(4);
  }
}

export default {
  swap,
  extractColorVariable,
};
