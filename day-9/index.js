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

function resolveKnotMovement(headX, headY, previousTailX, previousTailY, knotJourney) {
  const isTooFar = Math.abs(headX - previousTailX) > 1 || Math.abs(headY - previousTailY) > 1;
  if (isTooFar) {
    let x = previousTailX;
    let y = previousTailY;

    if (headX > previousTailX) {
      x = previousTailX + 1;
    } else if (headX < previousTailX) {
      x = previousTailX - 1;
    }
    if (headY > previousTailY) {
      y = previousTailY + 1;
    } else if (headY < previousTailY) {
      y = previousTailY - 1;
    }
    knotJourney.push({ x, y });
  } else {
    return knotJourney.push({ x: previousTailX, y: previousTailY });
  }
}

const knotJourney = [];

function resolveKnotsJourney() {
  for (let i = 0; i < 10; i++) {
    if (i === 0) {
      knotJourney.push(headJourney);
    } else {
      const previousKnotJourney = knotJourney[i - 1];
      const currentKnotJourney = [{ x: 0, y: 0}];
      for (let j = 0; j < previousKnotJourney.length; j++) {
        if (j !== 0) {
          const { x: headX, y: headY } = previousKnotJourney[j];
          const { x: previousTailX, y: previousTailY } = currentKnotJourney[j - 1];
          resolveKnotMovement(headX, headY, previousTailX, previousTailY, currentKnotJourney);
        }
      }
      knotJourney.push(currentKnotJourney);
    }
  }
}

resolveKnotsJourney();
console.log(knotJourney);

const uniqueTailPositions = new Set();
knotJourney.at(-1).forEach((position) => {
  uniqueTailPositions.add(`${position.x}-${position.y}`);
});

console.log(uniqueTailPositions.size);
// 2522, that's the right answer!
