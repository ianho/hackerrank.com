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

function angryChildren(k, arr) {
    // Complete this function
    arr.sort((x, y) => x - y);
    let min = arr[arr.length - 1];
    for (let i = 0; i < arr.length - k + 1; i++) {
        if (arr[i + k - 1] - arr[i] < min) {
            min = arr[i + k - 1] - arr[i];
        }
    }
    return min;
}

function main() {
    var n = parseInt(readLine());
    var k = parseInt(readLine());
    var arr = [];
    for(var arr_i = 0; arr_i < n; arr_i++){
       arr[arr_i] = parseInt(readLine());
    }
    var result = angryChildren(k, arr);
    process.stdout.write("" + result + "\n");

}
