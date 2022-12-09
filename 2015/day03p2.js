rl()
    .list()
    .tl({ ">": [1, 0], "<": [-1, 0], "^": [0, -1], v: [0, 1] })
    .bifurcate()
    .map((x) => x.cumsum().map(str).to_set())
    .reduce(__.u)
    .size.print();
