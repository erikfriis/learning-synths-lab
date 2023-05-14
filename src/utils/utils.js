function lerp(x, v0, v1) {
  return v0 + x * (v1 - v0);
}

function clamp(v, min, max) {
  return Math.max(Math.min(v, max), min);
}

function wrap(v, min, max) {
  return min + ((((v - min) % (max - min)) + (max - min)) % (max - min));
}

function smoothStep(v0, v1, x) {
  // console.log(v0, v1, x);
  if (x < v0) return v0;
  if (x > v1) return v1;
  return v0 + (v1 - v0) * (x ** 2 * (3 - 2 * x));
}

function smoothStepInv(v0, v1, x) {
  if (x < v0) return 0;
  if (x > v1) return 1;
  return v0 + (v1 - v0) * x * (2 * x ** 2 - 3 * x + 2);
}

function smootherstep(v0, v1, x) {
  if (x < v0) return v0;
  if (x > v1) return v1;
  return v0 + (v1 - v0) * (x ** 3 * (x * (x * 6 - 15) + 10));
}

function rsmul(x, a) {
  if (a == 0 || x == 0) return 0;
  return (a * x) / (2 * a * x - a - x + 1);
}

function curvefit3(x, min, middle, max) {
  return lerp(rsmul(x, (middle - min) / (max - min)), min, max);
}

export { curvefit3 };
