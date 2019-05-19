// exports.perimeter = (x, y) => (2 * (x + y))
// exports.area = (x, y) => (x * y)

// module.exports = {
//   perimeter: (x, y) => (2 * (x + y)),
//   area: (x, y) => (x * y)
// }

module.exports = (x, y, callback) => {
  if (x <= 0 || y <= 0) {
    setTimeout(() => {
      callback(new Error(`最小边不能小于0，l = ${x}, b = ${y}`), null), 2000
    })
  } else {
    setTimeout(() => {
      callback(null, {
        perimeter: () => (2 * (x + y)),
        area: () => (x * y)
      }), 2000
    })
  }
}