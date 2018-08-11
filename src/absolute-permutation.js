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

function absolute(n, k) {
  if (k > n / 2) return [-1]
  if (k == 0) return new Array(n).fill(0).map((x, index) => index + 1)
  let p = new Array(n).fill(0);
  let pos = new Array(n + 1).fill(-1);
  for (let i = 0; i < k; i++) {
      const ii = i + 1;
      p[i] = ii + k;
      pos[ii + k] = i;
      let jj = ii + k + k;
      while (jj + k <= n) {
        const j = jj - 1;
        p[j] = jj + k;
        pos[jj + k] = j;
        jj += k + k;
      }
  }
  // console.table({p})
  for (let i = n - k; i < n; i++) {
      if (p[i]) continue;
      const ii = i + 1;
      if (pos[ii - k] != -1) return [-1]
      p[i] = ii - k;
      pos[ii - k] = i;
      let jj = ii - k - k;
      while (jj - k > 0) {
        const j = jj - 1;
        if (p[j]) continue;
        p[j] = jj - k;
        pos[jj - k] = j;
        jj -= k + k;
      }
  }
  let check = true;
  while (check) {
      check = false;
      for (let i = k; i < n - k; i++) {
          if (p[i] != 0) continue;
          const ii = i + 1;
          const ii1 = ii - k;
          const ii2 = ii + k;
          // console.table({ii, p, pos});
          if (pos[ii1] != -1 && pos[ii2] != -1) return [-1];
          if (pos[ii1] == -1 && pos[ii2] == -1) continue;
          if (pos[ii1] == -1) {
              p[i] = ii1;
              pos[ii1] = i;
              if (!check) check = true;
              continue;
          }
          if (pos[ii2] == -1) {
              p[i] = ii2;
              pos[ii2] = i;
              if (!check) check = true;
          }
      }
  }
  check = true;
  while (check) {
      check = false;
      for (let i = k; i < n - k; i++) {
          if (p[i] != 0) continue;
          const ii = i + 1;
          const ii1 = ii - k;
          const ii2 = ii + k;
          if (pos[ii1] != -1 && pos[ii2] != -1) return [-1];
          if (pos[ii1] == -1) {
              p[i] = ii1;
              pos[ii1] = i;
              if (!check) check = true;
              continue;
          }
          if (pos[ii2] == -1) {
              p[i] = ii2;
              pos[ii2] = i;
              if (!check) check = true;
          }
      }
  }
  return p;
}

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var n_temp = readLine().split(' ');
        var n = parseInt(n_temp[0]);
        var k = parseInt(n_temp[1]);
        console.log(absolute(n, k).join(' '));
    }
}
