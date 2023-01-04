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
        headJourney.push({
          x: headJourney[headJourney.length - 1].x,
          y: headJourney[headJourney.length - 1].y + distance
        });
        break;
      case "D":
        headJourney.push({
          x: headJourney[headJourney.length - 1].x,
          y: headJourney[headJourney.length - 1].y - distance
        });
        break;
      case "L":
        headJourney.push({
          x: headJourney[headJourney.length - 1].x - distance,
          y: headJourney[headJourney.length - 1].y
        });
        break;
      case "R":
        headJourney.push({
          x: headJourney[headJourney.length - 1].x + distance,
          y: headJourney[headJourney.length - 1].y
        });
    }
  });
}

resolveHeadJourney();
console.log(headJourney);