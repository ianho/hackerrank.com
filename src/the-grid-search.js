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

function gridSearch(G, P) {
    // Complete this function
    let grid = G.map(g => new Array(P.length));
    for (let i = 0; i < G.length; i++) {
        for (let j = 0; j < P.length; j++) {
            grid[i][j] = [-1];
            let g = G[i];
            let index = g.indexOf(P[j]);
            while (index != -1) {
                grid[i][j].push(index + grid[i][j][grid[i][j].length - 1] + 1);
                g = g.slice(index + 1, g.length);
                index = g.indexOf(P[j]);
            }
        }
    }
    for (let i = 0; i < G.length - P.length + 1; i++) {
        if (grid[i][0][0].length == 1) continue;
        for (let j = 1; j < grid[i][0].length; j++) {
            const index = grid[i][0][j];
            let iG = i + 1;
            let iP = 1;
            while (iP < P.length) {
                if (grid[iG][iP].indexOf(index) == -1) break
                iG++;
                iP++;
            }
            if (iP == P.length) return 'YES';
        }
        const index = grid[i][0];
    }
    return 'NO'
}

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var R_temp = readLine().split(' ');
        var R = parseInt(R_temp[0]);
        var C = parseInt(R_temp[1]);
        var G = [];
        for(var G_i = 0; G_i < R; G_i++){
           G[G_i] = readLine();
        }
        var r_temp = readLine().split(' ');
        var r = parseInt(r_temp[0]);
        var c = parseInt(r_temp[1]);
        var P = [];
        for(var P_i = 0; P_i < r; P_i++){
           P[P_i] = readLine();
        }
        var result = gridSearch(G, P);
        process.stdout.write("" + result + "\n");
    }

}
