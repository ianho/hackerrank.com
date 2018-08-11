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

function move(i, j, m, n) {
    const distance = Math.min(i, j, m - i, n - j);
    if (i == distance && m - i == distance && j == distance && n - j == distance) {
        return {ni: i, nj: j}
    }
    if (i == distance && m - i == distance) {
        if (j == distance) return {ni: i, nj: n - distance}
        return {ni: i, nj: j - 1}
    }
    if (j == distance && n - j == distance) {
        if (i == distance) return {ni: m - distance, nj: j}
        return {ni: i - 1, nj: j}
    }
    if (i == distance) {
        if (j == distance) return {ni: i + 1, nj: j}
        return {ni: i, nj: j - 1}
    }
    if (j == distance) {
        if (m - i == distance) return {ni: i, nj: j + 1}
        return {ni: i + 1, nj: j}
    }
    if (m - i == distance) {
        if (n - j == distance) return {ni: i - 1, nj: j}
        return {ni: i, nj: j + 1}
    }
    if (n - j == distance) {
        if (i == distance) return {ni: i, nj: j - 1}
        return {ni: i - 1, nj: j}
    }
}

function matrixRotation(matrix, r, m, n) {
    // Complete this function
    let lines = [];
    for (let i = 0, j = 0; i < Math.ceil(m / 2), j < Math.ceil(n / 2); i++, j++) {
        lines.push([]);
        let {ni, nj} = move(i, j, m - 1, n - 1);
        while (!(ni == i && nj == j)) {
            lines[i].push(matrix[ni][nj]);
            const ij = move(ni, nj, m - 1, n - 1);
            ni = ij.ni;
            nj = ij.nj;
        }
        lines[i].push(matrix[i][j]);
    }
    for (let i = 0; i < lines.length; i++) {
        const step = r % lines[i].length;
        lines[i] = [...lines[i].slice(lines[i].length - step, lines[i].length), ...lines[i].slice(0, lines[i].length - step)];
    }
    for (let i = 0, j = 0; i < Math.ceil(m / 2), j < Math.ceil(n / 2); i++, j++) {
        matrix[i][j] = lines[i][lines[i].length - 1];
        let k = 0;
        let {ni, nj} = move(i, j, m - 1, n - 1);
        while (!(ni == i && nj == j)) {
            matrix[ni][nj] = lines[i][k];
            const ij = move(ni, nj, m - 1, n - 1);
            ni = ij.ni;
            nj = ij.nj;
            k++;
        }
    }
    matrix.map(m => console.log(m.join(' ')));
}

function main() {
    var m_temp = readLine().split(' ');
    var m = parseInt(m_temp[0]);
    var n = parseInt(m_temp[1]);
    var r = parseInt(m_temp[2]);
    var matrix = [];
    for(matrix_i = 0; matrix_i < m; matrix_i++){
       matrix[matrix_i] = readLine().split(' ');
       matrix[matrix_i] = matrix[matrix_i].map(Number);
    }
    matrixRotation(matrix, r, m, n);

}
