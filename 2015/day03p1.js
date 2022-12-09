rl()
    .list()
    .tl({ ">": [1, 0], "<": [-1, 0], "^": [0, -1], v: [0, 1] })
    .cumsum()
    .map(str)
    .to_set()
    .size.print();
