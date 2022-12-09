const subs = [];

groups[0].lines().map((x) => subs.push(x.split(" => ").reverse()));

let x = groups[1];

let i;

for (i = 0; x != "e"; i++) {
    for (const [a, b] of subs) {
        if (x.match(a)) {
            x = x.replace(a, b);
            break;
        }
    }
}

console.log(i);
