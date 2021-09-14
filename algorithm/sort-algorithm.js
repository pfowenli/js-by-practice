
/**
 * Insertion sort
 * @param {Array[number]} nums Number array
 * @returns {Array[number]}
 */
const _insertionSort = (nums = []) => {
    for (let i = 1; i < nums.length; i++) {
        const temp = nums[i]

        let j = i - 1

        for (; j >= 0; j--) {
            if (nums[j] <= temp) {
                break
            }

            nums[j+1] = nums[j]
        }

        nums[j+1] = temp
    }
    
    return nums
}

exports.insertionSort = _insertionSort
