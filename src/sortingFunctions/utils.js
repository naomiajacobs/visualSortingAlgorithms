let temp;

export function swap(row, indexA, indexB) {
  temp = row[indexB];
  row[indexB] = row[indexA];
  row[indexA] = temp;
};

export function extractColorVariable(sortBy, hslString) {
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
};

export function rand(min, max) {
  return parseInt(Math.random() * (max-min+1), 10) + min;
};

export function generateRandomColor(sortBy) {
  let h = 160;
  let s = 100;
  let l = 50;
  if (sortBy === 'hue') { h = rand(1, 360); } // color hue between 1 and 360
  if (sortBy === 'saturation') { s = rand(0, 100); } // color saturation between 0 and 100
  if (sortBy === 'lightness') { l = rand(0, 100); } // color lightness between 0 and 100
  return `hsl(${h},${s}%,${l}%)`;
};

export function randomId() {
  return Math.random() * 1000;
}

export default {
  swap,
  extractColorVariable,
  generateRandomColor,
  randomId,
};
