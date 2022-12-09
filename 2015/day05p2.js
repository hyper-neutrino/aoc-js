lines.filter((x) => x.match(/(..).*\1/) && x.match(/(.).\1/)).length.print();
