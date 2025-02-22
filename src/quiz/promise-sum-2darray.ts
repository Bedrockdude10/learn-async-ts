async function sum2DArrayConcurrent(arr: number[][]): Promise<number> {
    if (arr.length === 0) {
        throw new Error('Cannot sum an empty array');
    }

    // Compute row sums concurrently
    const rowSums = await Promise.all(
        arr.map(async row => row.reduce((acc, num) => acc + num, 0))
    );

    // Compute the total sum
    return rowSums.reduce((acc, sum) => acc + sum, 0);
}

// Example usage
const array2D_1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

(async () => {
    try {
        const result1 = await sum2DArrayConcurrent(array2D_1);
        console.log('Concurrent Sum:', result1);
    } catch (error) {
        console.error('Error:', error);
    }

    try {
        const result2 = await sum2DArrayConcurrent([]);
        console.log('Concurrent Sum:', result2);
    } catch (error) {
        console.error('Error:', error);
    }
})();