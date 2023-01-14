import testInputs from "./test-inputs.js";

interface Cycle {
  cycles: number;
  value: number;
}

function parseInput(input: string): Cycle {
  if (input.startsWith("addx")) {
    return {
      cycles: 2,
      value: parseInt(input.split(" ")[1])
    };
  } else {
    return {
      cycles: 1,
      value: 0
    };
  }
}

const xValueThroughCyclesTest = testInputs.reduce((acc, curr) => {
  const lastValue = acc[acc.length - 1];
  if (parseInput(curr).cycles === 1) {
    acc.push({ cycle: lastValue.cycle + 1, xValue: lastValue.xValue });
    return acc;
  } else {
    acc.push({ cycle: lastValue.cycle + 1, xValue: lastValue.xValue });
    acc.push({ cycle: lastValue.cycle + 2, xValue: lastValue.xValue + parseInput(curr).value });
    return acc;
  }
}, [{ cycle: 0, xValue: 1 }]);



function spriteIntersectsWithCycle(cycle: number, xValue: number): boolean {
  if (cycle % 40 === 0) {
    return cycle % 40 === xValue || cycle % 40 === xValue + 1;
  }
  return Math.abs(cycle % 40 - xValue) < 2;
}

const printAnswer = xValueThroughCyclesTest.reduce((acc, curr, i) => {
  const lastValue = xValueThroughCyclesTest[i - 1];
  if (i === 0) return acc;
  acc += spriteIntersectsWithCycle(lastValue.cycle, lastValue.xValue) ? "#" : " ";
  if (i % 40 === 0) {
    acc += "\n";
  }
  return acc;
}, "");

console.log(printAnswer);

// console.dir(xValueThroughCyclesTest, { "maxArrayLength": null })

const signalStrengthTest = [20, 60, 100, 140, 180, 220].reduce((acc, curr) => {
  const { cycle } = xValueThroughCyclesTest.find(cycle => cycle.cycle === curr) || { cycle: 0 };
  const { xValue } = xValueThroughCyclesTest.find(cycle => cycle.cycle === curr - 1) || { xValue: 0 };
  const result = xValue * cycle + acc;
  // console.log(cycle + " * " + xValue + " = " + cycle * xValue);
  return result;
}, 0);

//console.log(signalStrengthTest);

