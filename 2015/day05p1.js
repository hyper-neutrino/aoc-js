lines
    .filter(
        (x) =>
            x.match(/([aeiou].*){3,}/) &&
            x.match(/(.)\1/) &&
            !x.match(/ab|cd|pq|xy/)
    )
    .length.print();
