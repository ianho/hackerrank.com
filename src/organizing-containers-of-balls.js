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

class Organize {
    constructor(props) {
        this.possible = true;
        this.n = props.length;
        
        let count = new Array(this.n).fill(0);
        let containers = [];
        props.forEach((types) => {
            let balls = 0;
            types.forEach((type, index) => {
                balls += type;
                count[index] += type;
            });
            containers.push({
                types,
                balls,
                target: -1,
            });
        })
        this.containers = containers.map((container) => {
            let target = 0;
            while (target < count.length) {
                if (count[target] == container.balls) {
                    container.target = target;
                    count[target] = -1;
                    break;
                }
                target++;
            }
            if (target == count.length) {
                this.possible = false;
            }
            return container;
        })
    }
    
    swap(container1, type1, container2, type2) {
        this.containers[container1].types[type2]++;
        this.containers[container1].types[type1]--;
        this.containers[container2].types[type1]++;
        this.containers[container2].types[type2]--;
    }
    
    swapAll(container1, container2) {
        const type2 = this.containers[container1].target;
        while (this.containers[container2].types[type2] > 0) {
            let type1 = this.containers[container2].target;
            if (this.containers[container1].types[type1] > 0) {
                this.swap(container1, type1, container2, type2);
            } else {
                type1 = 0;
                while (this.containers[container1].types[type1] == 0 && type1 < this.n) {
                    type1++;
                }
                this.swap(container1, type1, container2, type2);
            }
        }
    }
    
    check() {
        for (let i = 0; i < this.n; i++) {
            for (let j = i + 1; j < this.n; j++) {
                this.swapAll(i, j);
            }
        }
    }
}

function organizingContainers(container) {
    // Complete this function
    let organize = new Organize(container);
    return organize.possible ? 'Possible' : 'Impossible';
    //organize.check();
    //console.log(organize.containers);
}

function main() {
    var q = parseInt(readLine());
    for(var a0 = 0; a0 < q; a0++){
        var n = parseInt(readLine());
        var container = [];
        for(container_i = 0; container_i < n; container_i++){
           container[container_i] = readLine().split(' ');
           container[container_i] = container[container_i].map(Number);
        }
        var result = organizingContainers(container);
        process.stdout.write("" + result + "\n");
    }

}
