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

function nonDivisibleSubset(k, arr) {
    // Complete this function
    let count = new Array(k).fill(0);
    arr = arr.map((a) => {
        const mod = a % k;
        count[mod]++;
        return mod;
    });
    let result = count[0] > 0 ? 1 : 0;
    if (k % 2 == 0 && count[Math.floor(k / 2)] > 0) result++;
    for (let i = 1; i < k / 2; i++) {
        result += Math.max(count[i], count[k - i])
    }
    return result;
}

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var k = parseInt(n_temp[1]);
    arr = readLine().split(' ');
    arr = arr.map(Number);
    var result = nonDivisibleSubset(k, arr);
    process.stdout.write("" + result + "\n");

}
