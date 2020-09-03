/* eslint-disable no-param-reassign */
export const travelDurationToIntMins = (travelDuration) => {
  return parseInt(travelDuration.split(' ')[0], 10);
};

function hslToRgb(h, s, l) {
  let r;
  let g;
  let b;

  if (s === 0) {
    // eslint-disable-next-line no-multi-assign
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function numberToColorHsl(i, min, max) {
  let ratio = i;
  if (min > 0 || max < 1) {
    if (i < min) {
      ratio = 0;
    } else if (i > max) {
      ratio = 1;
    } else {
      const range = max - min;
      ratio = (i - min) / range;
    }
  }

  const hue = (ratio * 1.2) / 3.6;

  // we convert hsl to rgb (saturation 100%, lightness 50%)
  const rgb = hslToRgb(hue, 1, 0.5);
  // we format to css value and return
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}
