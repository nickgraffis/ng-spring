const msPerFrame = 16;
const sampleDuration = 1e4;
const sampleMsPerFrame = msPerFrame / sampleDuration;
let reusedTuple = [0, 0];
function Springer(tension = 0.5, wobble = 0.5) {
  const stiffness = Math.min(Math.max(350 * tension, 20), 350);
  const damping = Math.min(Math.max(40 - 40 * wobble, 1), 40);
  const steps = [];
  let progress = 0;
  let velocity = 0;
  while (progress !== sampleDuration || velocity !== 0) {
    [progress, velocity] = stepper(progress, sampleDuration, velocity, stiffness, damping);
    steps.push(progress / sampleDuration);
  }
  return (i) => {
    return steps[Math.ceil(i * (steps.length - 1))];
  };
}
function stepper(value, destination, velocity, stiffness, damping) {
  const spring2 = -stiffness * (value - destination);
  const damper = -damping * velocity;
  const a = spring2 + damper;
  const newVelocity = velocity + a * sampleMsPerFrame;
  const newValue = value + newVelocity * sampleMsPerFrame;
  if (Math.abs(newVelocity) < 1 && Math.abs(newValue - destination) < 1) {
    reusedTuple[0] = destination;
    reusedTuple[1] = 0;
    return reusedTuple;
  }
  reusedTuple[0] = newValue;
  reusedTuple[1] = newVelocity;
  return reusedTuple;
}
function style(tokens) {
  return {
    type: 6,
    styles: tokens,
    offset: null
  };
}
const defaults = {
  stiffness: 50,
  damping: 80,
  precision: 2,
  unit: "px"
};
const transformMap = ["x", "y", "scale", "rotate"];
function roundToPrecision(num, precision = 2) {
  const decimalPoints = Math.pow(10, precision);
  return Math.ceil(num * decimalPoints) / decimalPoints;
}
const calcPropTweenVal = (prop, frame, from, to, { precision }) => (spring2) => {
  const value = (from[prop] || 0) + ((to[prop] || 0) - (from[prop] || 0)) * spring2(frame / 100);
  return roundToPrecision(value, precision);
};
const createCalcPropTweenVal = (from, to, options) => (prop, frame) => {
  const spring2 = Springer(options.damping / 100, options.stiffness / 100);
  return calcPropTweenVal(prop, frame, from, to, options)(spring2);
};
const splitTransform = (prop, value, transformList = []) => transformMap.includes(prop) ? { transform: [...transformList, [prop, value]] } : { [prop]: value };
const reduceFrame = (tween, property, value) => ({ ...tween, ...splitTransform(property, value, tween.transform) });
function mapTransformPropToCss(prop, sprungValue, unit = "px") {
  switch (prop) {
    case "y":
      return `translateY(${sprungValue}${unit})`;
    case "x":
      return `translateX(${sprungValue}${unit})`;
    case "scale":
      return `scale3d(${sprungValue}, ${sprungValue}, 1)`;
    case "rotate":
      return `rotate(${sprungValue}deg)`;
    default:
      return `${prop}(${sprungValue})`;
  }
}
const mapTransformProps = (sprungFrameTuples, unit) => sprungFrameTuples.reduce((transform, [prop, spring2]) => `${transform} ${mapTransformPropToCss(prop, spring2, unit)}`, "");
const mapToCss = (spring2, unit) => {
  let keys = Object.keys(spring2);
  let props = keys.reduce((props2, key) => ({ ...props2, [key]: key === "transform" ? mapTransformProps(spring2[key], unit) : spring2[key] }), {});
  return props;
};
function spring({ from, to }, options) {
  const { stiffness, damping, precision, unit } = {
    ...defaults,
    ...options
  };
  const calcTween = createCalcPropTweenVal(from, to, {
    stiffness,
    damping,
    precision
  });
  const frames = new Array(101).fill("");
  return frames.map((_, frame) => [
    Object.keys(from).reduce((tween, prop) => reduceFrame(tween, prop, calcTween(prop, frame)), {}),
    frame
  ]).map(([sprungValues, frame]) => [`${frame}%`, mapToCss(sprungValues, unit)]).filter(([frame, spring2], i, frames2) => {
    const lastIndex = i - 1 > 0 ? i - 1 : 0;
    return lastIndex > 0 && frame !== "100%" ? frames2[lastIndex][1] !== spring2 : true;
  }).map(([frame, spring2]) => style({ ...spring2, offset: parseInt(frame.replace("%", "")) / 100 }));
}
function index({ from, to }, options) {
  return {
    type: 5,
    steps: spring({ from, to }, options)
  };
}
export { index as default, spring };
