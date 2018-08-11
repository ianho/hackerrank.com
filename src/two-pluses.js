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

function maxPlusLength(grid, i, j) {
    const d = [{i: -1, j: 0}, {i: 1, j: 0}, {i: 0, j: -1}, {i: 0, j: 1}];
    let length = 0;
    while (true) {
        length++;
        let ok = true;
        for (let di = 0; di < d.length; di++) {
            const ii = i + d[di].i * length;
            const jj = j + d[di].j * length;
            if (ii < 0 || ii >= grid.length || jj < 0 || jj >= grid[0].length) {
                ok = false;
                break;
            }
            if (grid[ii][jj] != 'G') {
                ok = false;
                break;
            }
        }
        if (!ok) break;
    }
    return length;
}

function drawPlus(grid, i, j, length) {
    const d = [{i: -1, j: 0}, {i: 1, j: 0}, {i: 0, j: -1}, {i: 0, j: 1}];
    let newGrid = grid.map(row => row.map(g => g));
    newGrid[i][j] = 'P';
    for (let l = 1; l < length; l++) {
        for (let di = 0; di < d.length; di++) {
            const ii = i + d[di].i * l;
            const jj = j + d[di].j * l;
            newGrid[ii][jj] = 'P';
        }
    }
    return newGrid;
}

function twoPluses(grid) {
    // Complete this function
    let max = 1;
    grid = grid.map(g => g.split(''));
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 'G') {
                const maxLen1 = maxPlusLength(grid, i, j);
                for (let len1 = 1; len1 <= maxLen1; len1++) {
                    const area1 = (len1 - 1) * 4 + 1;
                    const newGrid = drawPlus(grid, i, j, len1);
                    for (ii = 0; ii < grid.length; ii++) {
                        for (jj = 0; jj < grid[ii].length; jj++) {
                            if (newGrid[ii][jj] == 'G') {
                                const len2 = maxPlusLength(newGrid, ii, jj);
                                const area2 = (len2 - 1) * 4 + 1;
                                if (area1 * area2 > max) {
                                    max = area1 * area2;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return max;
}

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var m = parseInt(n_temp[1]);
    var grid = [];
    for(var grid_i = 0; grid_i < n; grid_i++){
       grid[grid_i] = readLine();
    }
    var result = twoPluses(grid);
    process.stdout.write("" + result + "\n");

}
