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

function check(arr) {
    for (let i = 0; i <= arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false
    }
    return true
}

function almostSorted(arr) {
    // Complete this function
    let ar = [-1, ...arr, 1000001];
    let peaks = [];
    let valleys = [];
    let peak;
    let valley;
    for (let i = 1; i < ar.length - 1; i++) {
        if (ar[i] > ar[i - 1] && ar[i] > ar[i + 1]) {
            peaks.push(i);
        }
        if (ar[i] < ar[i - 1] && ar[i] < ar[i + 1]) {
            valleys.push(i);
        }
    }
    
    if (peaks.length == 0 && valleys.length == 0) {
        return console.log('yes')
    } else if (peaks.length == 1 && valleys.length == 1) {
        peak = peaks[0];
        valley = valleys[0];
    } else if (peaks.length == 2 && valleys.length == 2) {
        if (peaks[0] + 1 == valleys[0]) {
            peak = peaks[0];
            valley = valleys[1];
        } else {
            return console.log('no')
        }
    } else {
        return console.log('no')
    }
    
    if (peak > valley) {
        return console.log('no')
    }
    
    let swapAr = [...ar];
    swapAr[peak] = ar[valley];
    swapAr[valley] = ar[peak];
    if (check(swapAr)) {
        return console.log(`yes\nswap ${peak} ${valley}`)
    }
    
    let reverseAr = [...ar];
    for (let i = peak; i <= valley; i++) {
        reverseAr[i] = ar[valley + peak - i];
    }
    if (check(reverseAr)) {
        return console.log(`yes\nreverse ${peak} ${valley}`)
    }
    
    console.log('no');
}

function main() {
    var n = parseInt(readLine());
    arr = readLine().split(' ');
    arr = arr.map(Number);
    almostSorted(arr);

}
