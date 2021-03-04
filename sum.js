/**
 * Sum numbers with precision of 8
 * @param numbers
 * @returns {number}
 */
function sum( ...numbers) {
    const precision     = 8;
    let   sum           = 0;
    const numbersLength = numbers.length;
    for (let i =0; i < numbersLength; i++) {
        sum = Number(Number(sum) + Number(numbers[i])).toPrecision(precision);
    }
    return sum;
}