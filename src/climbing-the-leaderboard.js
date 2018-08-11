process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function climbingLeaderboard(scores, alice) {
    // Complete this function
    let scoresNR = [...new Set(scores)];
    let rank = scoresNR.length - 1;
    let results = [];
    for (let i = 0; i < alice.length; i++) {
        while (alice[i] > scoresNR[rank] && rank > 0) rank--;
        if (alice[i] >= scoresNR[rank]) {
            results.push(rank + 1);
        } else {
            results.push(rank + 2);
        }
    }
    return results;
}

function main() {
    var n = parseInt(readLine());
    scores = readLine().split(' ');
    scores = scores.map(Number);
    var m = parseInt(readLine());
    alice = readLine().split(' ');
    alice = alice.map(Number);
    var result = climbingLeaderboard(scores, alice);
    console.log(result.join("\n"));
}
