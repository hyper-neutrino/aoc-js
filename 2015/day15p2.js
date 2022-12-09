const ing = lines.map(_.ints());

intpart(100, lines.length)
    .map(_.dp(ing))
    .filter((x) => x.pop() == 500)
    .map((x) => x.maxWith(0))
    .map(_.reduce(__._mul))
    .max()
    .print();
