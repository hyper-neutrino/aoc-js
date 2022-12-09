let _d = `Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3
`;

_d = _d.replaceAll(/\+\d+/g, "");

_d = _d.split("\n\n");

const [weapons, armors, rings] = _d.map(_.ints()).map(_.chunks(3));

const [hp, d, a] = data.ints();

const z = [0, 0, 0];
armors.push(z);
rings.push(z);
rings.push(z);

let mc = Infinity;

function hit(i, j) {
    j.hp -= Math.max(1, i.d - j.a);
}

for (const i1 of weapons) {
    for (const i2 of armors) {
        for (const [i3, i4] of rings.combinations(2)) {
            const [c, _d, _a] = i1._add(i2)._add(i3)._add(i4);
            const p = { hp: 100, d: _d, a: _a };
            const b = { hp, d, a };

            while (true) {
                hit(p, b);
                if (b.hp <= 0) {
                    mc = Math.min(mc, c);
                    break;
                }
                hit(b, p);
                if (p.hp <= 0) break;
            }
        }
    }
}

mc.print();
