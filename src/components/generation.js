function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const generate = (size) => {
    const options = size**2 - 1
    const single = [...Array(options/2).keys()]
    const pairs = [...single, ...single, "!"]
    return shuffle(pairs)
}

module.exports = generate