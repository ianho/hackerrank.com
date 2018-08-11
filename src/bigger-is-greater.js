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

function biggerIsGreater(w) {
    // Complete this function
    let wArr = w.split('');
    //console.log(wArr);
    let point1 = wArr.length - 1;
    while (point1 > 0 && wArr[point1] <= wArr[point1 - 1]) point1--;
    //console.log(point1);
    if (point1 == 0) return 'no answer';
    let point2 = point1;
    point1--;
    let min = wArr[point2];
    for (let i = point1 + 2; i < wArr.length; i++) {
        if (wArr[i] < min && wArr[i] > wArr[point1]) {
            point2 = i;
            min = wArr[i];
        }
    }
    [wArr[point1], wArr[point2]] = [wArr[point2], wArr[point1]];
    //console.log(wArr);
    const arr1 = wArr.slice(0, point1 + 1);
    let arr2 = wArr.slice(point1 + 1, wArr.length);
    arr2.sort((x, y) => x >= y ? 1 : -1);
    //console.log(arr1, arr2);
    return [...arr1, ...arr2].join('');
}

function main() {
    var T = parseInt(readLine());
    for(var a0 = 0; a0 < T; a0++){
        var w = readLine();
        var result = biggerIsGreater(w);
        process.stdout.write("" + result + "\n");
    }

}
