const {
    insertionSort,
} = require('./sort-algorithm')


const nums = [6,5,3,1,8,7,2,4]
let sortedNums = []

sortedNums = insertionSort(nums)

console.log(nums)
console.log(sortedNums)
