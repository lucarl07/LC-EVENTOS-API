const partIds = [];

const getRandomId = () => {
    const nid = (Math.random() * (999999 - 100000) + 1000).toFixed(0);
    partIds.push(nid)

    const isIdUnique = partIds.find((id) => nid === id);

    if (isIdUnique == undefined) {
        return nid;
    }
}

console.log(getRandomId())