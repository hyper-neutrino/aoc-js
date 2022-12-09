grid = grid.map(_.tl({ "#": 1, ".": 0 }));

for (const i of loop(100)) {
    grid = grid.vmap((k, [x, y]) =>
        [-1, 0, 1]
            .selfie(__.cart)
            .flat()
            .filter(([x, y]) => x || y)
            .map(([i, j]) => grid[x + i]?.[y + j] ?? 0)
            .sum()
            .in(k ? [2, 3] : [3])
    );
}

grid.map(_.sum()).sum().print();
