grid = grid.map(_.tl({ "#": 1, ".": 0 }));

const f = () => (grid[0][0] = grid[0][99] = grid[99][0] = grid[99][99] = 1);

f();

for (const i of loop(100)) {
    grid = grid.vmap(
        (k, [x, y]) =>
            [-1, 0, 1]
                .selfie(__.cart)
                .flat()
                .map(([i, j]) => grid[x + i]?.[y + j] ?? 0)
                .sum()
                .in(k ? [3, 4] : [3]) + 0
    );
    f();
}

grid.map(_.sum()).sum().print();
