const ing = lines.map(_.ints()).map((x) => (x.pop(), x));

intpart(100, lines.length)
    .map(_.dp(ing))
    .map((x) => x.maxWith(0))
    .map(_.reduce(__._mul))
    .max()
    .print();
