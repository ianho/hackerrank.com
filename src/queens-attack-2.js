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

function queensAttack(n, k, r_q, c_q, obstacles) {
    // Complete this function
    const sum = r_q + c_q;
    const diff = r_q - c_q;
    let near = {
        top: {r: n + 1, c: c_q},
        bottom: {r: 0, c: c_q},
        left: {r: r_q, c: 0},
        right: {r: r_q, c: n + 1},
        topLeft: sum >= n + 1 ? {r: n + 1, c: sum - (n + 1)} : {r: sum, c: 0},
        bottomRight: sum >= n + 1 ? {r: sum - (n + 1) , c: n + 1} : {r: 0, c: sum},
        topRight: diff >= 0 ? {r: n + 1, c: (n + 1) - diff} : {r: diff + (n + 1), c: n + 1},
        bottomLeft: diff >= 0 ? {r: diff, c: 0} : {r: 0, c: diff * -1},
    };
    obstacles.forEach((obstacle) => {
        const [r, c] = obstacle;
        //top,bottom
        if (c == c_q) {
            //top
            if (r > r_q && r - r_q < near.top.r - r_q) near.top = {r, c};
            //bottom
            if (r < r_q && r_q - r < r_q - near.bottom.r) near.bottom = {r, c};
        }
        //left,right
        if (r == r_q) {
            //left
            if (c < c_q && c_q - c < c_q - near.left.c) near.left = {r, c};
            //right
            if (c > c_q && c - c_q < near.right.c - c_q) near.right = {r, c};
        }
        //topLeft,bottomRight
        if (r + c == sum) {
            //topLeft
            if (c < c_q && c_q - c < c_q - near.topLeft.c) near.topLeft = {r, c};
            //bottomRight
            if (c > c_q && c - c_q < near.bottomRight.c - c_q) near.bottomRight = {r, c};
        }
        //topRight,bottomLeft
        if (r - c == diff) {
            //topRight
            if (r > r_q && r - r_q < near.topRight.r - r_q) near.topRight = {r, c};
            //bottomLeft
            if (r < r_q && r_q - r < r_q - near.bottomLeft.r) near.bottomLeft = {r, c};
        }
    })
    return -8 +
        (near.top.r - r_q) +         //top
        (r_q - near.bottom.r) +      //bottom
        (c_q - near.left.c) +        //left
        (near.right.c - c_q) +       //right
        (c_q - near.topLeft.c) +     //topLeft
        (near.bottomRight.c - c_q) + //bottomRight
        (near.topRight.r - r_q) +    //topRight
        (r_q - near.bottomLeft.r)    //bottomLeft
}

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var k = parseInt(n_temp[1]);
    var r_q_temp = readLine().split(' ');
    var r_q = parseInt(r_q_temp[0]);
    var c_q = parseInt(r_q_temp[1]);
    var obstacles = [];
    for(obstacles_i = 0; obstacles_i < k; obstacles_i++){
       obstacles[obstacles_i] = readLine().split(' ');
       obstacles[obstacles_i] = obstacles[obstacles_i].map(Number);
    }
    var result = queensAttack(n, k, r_q, c_q, obstacles);
    process.stdout.write("" + result + "\n");

}
