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
    .map(_.last())
    .max()
    .print();
