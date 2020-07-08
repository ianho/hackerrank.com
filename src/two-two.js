'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function multiple(s) {
  const num = s.split('').reverse().map(n => Number(n) * 2);
  let i = 0;
  while (i < num.length) {
    if (num[i] >= 10) {
      if (i + 1 < num.length) {
        num[i + 1] += Math.floor(num[i] / 10);
      } else {
        num.push(Math.floor(num[i] / 10));
      }
      num[i] = num[i] % 10;
    }
    i++;
  }
  return num.reverse().join('');
}

function preCalc() {
  const powerList = ['1'];
  for (let i = 0; i < 800; i++) {
    powerList.push(multiple(powerList[powerList.length - 1]));
  }
  global.powerList = powerList.map(power => new RegExp(power, 'g'));
}

/*
 * Complete the twoTwo function below.
 */
function twoTwo(a) {
    /*
     * Write your code here.
     */
    let result = 0;
    for (let i = 0; i < global.powerList.length; i++) {
      result += (a.match(global.powerList[i]) || []).length;
    }
    return result;
}

function main() {
    preCalc();

    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const a = readLine();

        let result = twoTwo(a);

        ws.write(result + "\n");
    }

    ws.end();
}
