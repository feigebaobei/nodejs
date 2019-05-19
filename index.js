// var rect = {
//   perimeter: (x, y) => (2 * (x + y)),
//   area: (x, y) => (x * y)
// }
var rect = require('./rectangle')
function solveRect(l, b) {
  console.log(`Solveing for rectangle with l = ${l} and b = ${b}`)
  // if (l <= 0 || b <= 0) {
  //   console.log(`Rectangle dimensions should be greater than zero: l = ${l}, and b = ${b}`)
  // } else {
  //   console.log(`The area of the rectangle is ${rect.area(l, b)}`)
  //   console.log(`The perimeter of the rectangle is ${rect.perimeter(l, b)}`)
  // }

  rect(l, b, (err, rectangle) => {
    if (err) {
      console.log('error', err.message)
    } else {
      console.log(`area: ${rectangle.area()}`)
      console.log(`perimeter: ${rectangle.perimeter()}`)
    }
  })
}

solveRect(2, 4)
solveRect(3, 5)
solveRect(0, 5)
solveRect(-3, 5)