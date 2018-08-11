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

function timeInWords(h, m) {
    // Complete this function
    const numWords = ['zero', 
                      'one', 'two', 'three', 'four', 'five',
                      'six', 'seven', 'eight', 'nine', 'ten',
                      'eleven', 'twelve', 'thirteen', 'fourteen', 'quarter',
                      'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
                      'twenty one', 'twenty two', 'twenty three', 'twenty four', 'twenty five',
                      'twenty six', 'twenty seven', 'twenty eight', 'twenty nine', 'half'];
    let [p1, p2, p3, p4, p5] = ['', 'minute', 'past', '', ''];
    if (m > 30) {
        m = 60 - m;
        h += 1;
        p3 = 'to';
    }
    [p1, p4] = [numWords[m], numWords[h]];
    if (m == 0) {
        [p1, p2, p3, p5] = ['', '', '', 'o\' clock'];
    }
    if (m > 1) {
        p2 = 'minutes';
    }
    if (m == 15 || m == 30) {
        p2 = '';
    }
    return `${p1} ${p2} ${p3} ${p4} ${p5}`.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ');
}

function main() {
    var h = parseInt(readLine());
    var m = parseInt(readLine());
    var result = timeInWords(h, m);
    process.stdout.write("" + result + "\n");

}
