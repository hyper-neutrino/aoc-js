data.ints()
    .powerset()
    .filter((x) => x.sum() == 150)
    .minimal((x) => x.length)
    .length.print();
