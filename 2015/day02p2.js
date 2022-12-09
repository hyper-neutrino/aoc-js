lines
    .map(_.ints())
    .map(_.nsort())
    .map(([x, y, z]) => 2 * (x + y) + x * y * z)
    .sum()
    .print();
