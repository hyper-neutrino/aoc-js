lines
    .map((x) => x.length - eval(x).length)
    .sum()
    .print();
