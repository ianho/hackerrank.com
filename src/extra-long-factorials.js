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

function x(numArr, num) {
    let arr = numArr.map(n => n * num);
    let point = 0;
    while (true) {
        let more = Math.floor(arr[point] / 10);
        if (more > 0 || point + 1 < arr.length) {
            arr[point] = arr[point] % 10;
            if (point + 1 < arr.length) {
                arr[point + 1] += more;
            } else {
                arr.push(more);
            }
            point++;
        } else {
            break;
        }
    }
    return arr;
}

function extraLongFactorials(n) {
    // Complete this function
    let result = [1];
    for (let i = 1; i <= n; i++) {
        result = x(result, i);
    }
    console.log(result.reverse().join(''));
}

function main() {
    var n = parseInt(readLine());
    extraLongFactorials(n);
}
