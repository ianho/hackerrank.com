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
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the unboundedKnapsack function below.
function unboundedKnapsack(k, arr) {
    let arrSet = new Set(arr);
    if (arrSet.has(1)) return k;
    let can = new Set();
    can.add(0);
    for (let i of arrSet) {
        if (k % i === 0) return k;
        let x = 1;
        let xx = i * x;
        while (xx < k) {
            can.add(xx);
            x++;
            xx = i * x;
        }
    }
    while (true) {
        let size = can.size;
        for (let i of can) {
            for (let j of can) {
                let add = i + j;
                if (add === k) return k;
                if (add < k) can.add(i + j);
            }
        }
        if (can.size === size) break;
    }
    let i = 1;
    while (true) {
        if (can.has(k - i)) return k - i;
        i++;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);
    
    let result = [];
    
    for (let i = 0; i < t; i++) {

        const nk = readLine().split(' ');

        const n = parseInt(nk[0], 10);

        const k = parseInt(nk[1], 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
        
        result.push(unboundedKnapsack(k, arr));
    }

    ws.write(result.join("\n"));

    ws.end();
}
