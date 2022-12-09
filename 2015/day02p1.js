lines
    .map(_.ints())
    .map(_.nsort())
    .map(([x, y, z]) => 2 * (x * y + y * z + z * x) + x * y)
    .sum()
    .print();
