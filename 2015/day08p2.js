lines
    .map((x) => JSON.stringify(x).length - x.length)
    .sum()
    .print();
