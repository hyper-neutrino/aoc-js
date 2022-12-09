lines
    .map(_.ints())
    .map(([s, m, p]) => {
        const o = [];
        let moving = true;
        let left = m;
        let dist = 0;

        for (const i of loop(2503)) {
            if (moving) o.push((dist += s));
            else o.push(dist);

            left--;

            if (left == 0) {
                moving ^= true;
                if (moving) left = m;
                else left = p;
            }
        }

        return o;
    })
    .zip()
    .prepend(new Array(lines.length).fill(0))
    .reduce((x, y) => {
        return x._add(y.map((i) => (i == y.max() ? 1 : 0)));
    })
    .max()
    .print();
