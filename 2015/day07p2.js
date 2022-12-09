let sigs = {};

function ev(n) {
    if (n.match(/^\d+$/)) return parseInt(n);
    if (n in sigs) return sigs[n];
    throw 0;
}

const f = () =>
    lines.dynLoop((x) => {
        const [l, r] = x.split(" -> ");

        if (r in sigs) return;

        let value;

        if (l.startsWith("NOT")) {
            try {
                value = 65535 - ev(l.slice(4));
            } catch {}
        } else if (l.match(/ /)) {
            let [a, op, b] = l.split(" ");
            try {
                a = ev(a);
                b = ev(b);

                if (op == "AND") value = a & b;
                if (op == "OR") value = a | b;
                if (op == "LSHIFT") value = (a << b) % 65536;
                if (op == "RSHIFT") value = a >> b;
            } catch {}
        } else {
            try {
                value = ev(l);
            } catch {}
        }

        if (value !== undefined) sigs[r] = value;
        else lines.push(x);
    });

f();

sigs = { b: sigs.a };

f();

sigs.a.print();
