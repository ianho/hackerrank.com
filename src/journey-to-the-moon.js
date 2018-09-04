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

// Complete the journeyToMoon function below.
function journeyToMoon(n, astronaut) {
    const countries = [];
    const astronautBelongs = [];
    for (let i = 0; i < n; i++) {
        countries.push([i]);
        astronautBelongs.push(i);
    }
    astronaut.forEach(pair => {
        const astronautA = pair[0];
        const astronautB = pair[1];
        const countryA = astronautBelongs[astronautA];
        const countryB = astronautBelongs[astronautB];
        if (countryA === countryB) return;
        countries[countryA].push(...countries[countryB]);
        countries[countryB].forEach(astronaut => astronautBelongs[astronaut] = countryA);
        countries[countryB] = [];
    })
    let countryCount = 0;
    let result = 0;
    let c = []; //cleared country
    let s = 0; //count countries with single astronaut
    countries.forEach(country => {
        if (country.length > 1) {
            c.push(country.length);
        } else if (country.length === 1) {
            s++;
        }
    })
    for (let i = 0; i < c.length - 1; i++) {
        for (let j = i + 1; j < c.length; j++) {
            result += c[i] * c[j];
        }
    }
    //C(s,2)
    result += (s * (s - 1)) / 2;
    for (let i = 0; i < c.length; i++) {
        result += c[i] * s;
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const np = readLine().split(' ');

    const n = parseInt(np[0], 10);

    const p = parseInt(np[1], 10);

    let astronaut = Array(p);

    for (let i = 0; i < p; i++) {
        astronaut[i] = readLine().split(' ').map(astronautTemp => parseInt(astronautTemp, 10));
    }

    let result = journeyToMoon(n, astronaut);

    ws.write(result + "\n");

    ws.end();
}
