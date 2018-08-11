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

function cost(s, ss) {
    s = s.map(a => a.join('')).join('');
    let cost = 0;
    for (let i = 0; i < s.length; i++) {
        cost += Math.abs(parseInt(s[i]) - parseInt(ss[i]));
    }
    return cost;
}

function formingMagicSquare(s) {
    // Complete this function
    const ss = ['618753294','816357492','834159672','438951276','672159834','276951438','294753618','492357816',];
    let min = 100;
    for (let i = 0; i < ss.length; i++) {
        const co = cost(s, ss[i]);
        if (co < min) min = co;
    }
    return min;
}

function main() {
    var s = [];
    for(s_i = 0; s_i < 3; s_i++){
       s[s_i] = readLine().split(' ');
       s[s_i] = s[s_i].map(Number);
    }
    var result = formingMagicSquare(s);
    process.stdout.write("" + result + "\n");
}
