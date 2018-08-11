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

function surfaceArea(A) {
    // Complete this function
    const nears = [[0,1],[0,-1],[1,0],[-1,0]]
    A = [new Array(A[0].length + 2).fill(0), ...A.map(a => [0, ...a, 0]), new Array(A[0].length + 2).fill(0)];
    let result = 0;
    for (i = 1; i < A.length - 1; i++) {
        for (j = 1; j < A[i].length - 1; j++) {
            const hear = A[i][j];
            let area = 2;
            for (n = 0; n < 4; n++) {
                const near = A[i + nears[n][0]][j + nears[n][1]];
                if (near > hear) continue;
                area += hear - near;
            }
            result += area;
        }
    }
    return result;
}

function main() {
    var H_temp = readLine().split(' ');
    var H = parseInt(H_temp[0]);
    var W = parseInt(H_temp[1]);
    var A = [];
    for(A_i = 0; A_i < H; A_i++){
       A[A_i] = readLine().split(' ');
       A[A_i] = A[A_i].map(Number);
    }
    var result = surfaceArea(A);
    process.stdout.write("" + result + "\n");

}
