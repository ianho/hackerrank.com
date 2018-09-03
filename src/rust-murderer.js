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

/*
 * Complete the rustMurdered function below.
 */
function rustMurderer(n, roads, s) {
    /*
     * Write your code here.
     */
    let roadsHash = {};
    roads.forEach(road => {
        roadsHash[road[0] + ',' + road[1]] = true;
        roadsHash[road[1] + ',' + road[0]] = true;
    })
    let nodes = new Set();
    for (let i = 0; i < n; i++) {
        nodes.add(i);
    }
    nodes.delete(s);
    let nodesDistance = new Array(n).fill(0);
    let depthNodes = [s];
    let distance = 0;
    while (nodes.size > 0) {
        distance++;
        let newDepthNodes = [];
        depthNodes.forEach(node => {
            for (let tnode of nodes.values()) {
                if (!roadsHash[node + ',' + tnode]) {
                    nodes.delete(tnode);
                    newDepthNodes.push(tnode);
                    nodesDistance[tnode] = distance;
                }
            }
        })
        if (newDepthNodes.length === 0) break;
        depthNodes = newDepthNodes;
    }
    nodesDistance.splice(s, 1);
    return nodesDistance;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const nm = readLine().split(' ');

        const n = parseInt(nm[0], 10);

        const m = parseInt(nm[1], 10);

        let roads = Array(m);

        for (let roadsRowItr = 0; roadsRowItr < m; roadsRowItr++) {
            roads[roadsRowItr] = readLine().split(' ').map(roadsTemp => parseInt(roadsTemp, 10) - 1);
        }

        const s = parseInt(readLine(), 10) - 1;

        let result = rustMurderer(n, roads, s);

        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}
