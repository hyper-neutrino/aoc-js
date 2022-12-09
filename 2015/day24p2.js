const boxes = data.ints();
const target = boxes.sum() / 4;

for (let i = 1; i < boxes.length; ++i) {
    for (const group of boxes.combinations(i)) {
        if (group.sum() == target) {
            group.reduce(__._mul).print();
            process.exit(0);
        }
    }
}
