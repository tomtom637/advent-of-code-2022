import fs from "fs";
import rawInputs from "./rawInputs.js";

const inputsArray = rawInputs.split("\n");
const inputs = inputsArray.map((input) => (
  { direction: input.split(" ")[0], distance: parseInt(input.split(" ")[1]) }
));

const headJourney = [{ x: 0, y: 0 }];

function resolveHeadJourney() {
  inputs.forEach((input) => {
    const { direction, distance } = input;
    switch (direction) {
      case "U":
        for (let i = 0; i < distance; i++) {
          headJourney.push({
            x: headJourney[headJourney.length - 1].x,
            y: headJourney[headJourney.length - 1].y + 1
          });
        }
        break;
      case "D":
        for (let i = 0; i < distance; i++) {
          headJourney.push({
            x: headJourney[headJourney.length - 1].x,
            y: headJourney[headJourney.length - 1].y - 1
          });
        }
        break;
      case "L":
        for (let i = 0; i < distance; i++) {
          headJourney.push({
            x: headJourney[headJourney.length - 1].x - 1,
            y: headJourney[headJourney.length - 1].y
          });
        }
        break;
      case "R":
        for (let i = 0; i < distance; i++) {
          headJourney.push({
            x: headJourney[headJourney.length - 1].x + 1,
            y: headJourney[headJourney.length - 1].y
          });
        }
        break;
    }
  });
}

resolveHeadJourney();

// const tailJourney = [{ x: 0, y: 0 }];

function resolveKnotMovement(headX, headY, previousTailX, previousTailY, knotJourney) {
  const isTooFar = Math.abs(headX - previousTailX) > 1 || Math.abs(headY - previousTailY) > 1;
  const isStraight = headX === previousTailX || headY === previousTailY;
  const xTooFar = Math.abs(headX - previousTailX) > 1;
  const toTheRight = headX > previousTailX;
  const toTheTop = headY > previousTailY;

  if (isTooFar) {
    if (isStraight) {
      if (xTooFar) {
        if (toTheRight) {
          return knotJourney.push({ x: previousTailX + 1, y: previousTailY });
        } else {
          return knotJourney.push({ x: previousTailX - 1, y: previousTailY });
        }
      } else { // y too far
        if (toTheTop) {
          return knotJourney.push({ x: previousTailX, y: previousTailY + 1 });
        } else {
          return knotJourney.push({ x: previousTailX, y: previousTailY - 1 });
        }
      }
    } else { // is diagonal
      if (xTooFar) {
        if (toTheRight) {
          return knotJourney.push({ x: previousTailX + 1, y: headY });
        } else {
          return knotJourney.push({ x: previousTailX - 1, y: headY });
        }
      } else { // y too far
        if (toTheTop) {
          return knotJourney.push({ x: headX, y: previousTailY + 1 });
        } else {
          return knotJourney.push({ x: headX, y: previousTailY - 1 });
        }
      }
    }
  } else {
    return knotJourney.push({ x: previousTailX, y: previousTailY });
  }
}

function resolveKnotsJourney() {
  const knots = {
  k1: [{ x: 0, y: 0 }],
  k2: [{ x: 0, y: 0 }],
  k3: [{ x: 0, y: 0 }],
  k4: [{ x: 0, y: 0 }],
  k5: [{ x: 0, y: 0 }],
  k6: [{ x: 0, y: 0 }],
  k7: [{ x: 0, y: 0 }],
  k8: [{ x: 0, y: 0 }],
  k9: [{ x: 0, y: 0 }],
}

Object.keys(knots).forEach((knot, i) => {
  if (i === 0) {
    headJourney.forEach((headPosition, index) => {
      if (index === 0) return;
      const previousTailPosition = knots[knot][knots[knot].length - 1];
      resolveKnotMovement(
        headPosition.x,
        headPosition.y,
        previousTailPosition.x,
        previousTailPosition.y,
        knots[knot]
      );
    });
  } else {
    knots[Object.keys(knots)[i - 1]].forEach((headPosition, index) => {
      if (index === 0) return;
      const previousTailPosition = knots[knot][knots[knot].length - 1];
      resolveKnotMovement(
        headPosition.x,
        headPosition.y,
        previousTailPosition.x,
        previousTailPosition.y,
        knots[knot]
      );
    });
  }
});
  return knots;
}

const tailJourney = resolveKnotsJourney().k9;


const uniqueTailPositions = new Set();
tailJourney.forEach((position) => {
  uniqueTailPositions.add(`${position.x}-${position.y}`);
});

console.log(uniqueTailPositions.size);
// 2585, your answer is too high.

// const journey = headJourney.reduce((acc, curr, i) => {
//   acc.push({
//     head: curr,
//     tail: tailJourney[i]
//   });
//   return acc;
// }, []);

// fs.writeFileSync("./journey.json", JSON.stringify(journey, null, 2));