const r = { a: 0, b: 0 };

let i = 0;

lines = lines.map(_.replaceAll(",", ""));

while (i < lines.length) {
    const cmd = lines[i].split(" ");
    switch (cmd[0]) {
        case "hlf":
            r[cmd[1]] = Math.floor((r[cmd[1]] ?? 0) / 2);
            ++i;
            break;
        case "tpl":
            r[cmd[1]] = r[cmd[1]] * 3;
            ++i;
            break;
        case "inc":
            r[cmd[1]] = r[cmd[1]] + 1;
            ++i;
            break;
        case "jmp":
            i += int(cmd[1]);
            break;
        case "jie":
            if (r[cmd[1]] % 2 == 0) i += int(cmd[2]);
            else ++i;
            break;
        case "jio":
            if (r[cmd[1]] == 1) i += int(cmd[2]);
            else ++i;
            break;
        default:
            throw "?";
    }
}

console.log(r.b);
