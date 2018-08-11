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

function encryption(s) {
    // Complete this function
    const L = s.length;
    const sqrt = Math.floor(Math.sqrt(L));
    let r, c;
    if (sqrt * sqrt >= L) {
        r = sqrt;
        c = sqrt;
    } else if (sqrt * (sqrt + 1) >= L) {
        r = sqrt;
        c = sqrt + 1;
    } else {
        r = sqrt + 1;
        c = sqrt + 1;
    }
    let result = [];
    for (let i = 0; i < c; i++) {
        let j = i;
        let es = '';
        while (j < s.length) {
            es = `${es}${s[j]}`;
            j += c;
        }
        result.push(es);
    }
    return result.join(' ');
}

function main() {
    var s = readLine();
    var result = encryption(s);
    process.stdout.write("" + result + "\n");

}
