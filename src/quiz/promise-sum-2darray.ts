function sum2DArrayConcurrent(arr: number[][]): Promise<number> {
    return new Promise((resolve, reject) => {
        if (arr.length === 0) {
            reject('Cannot sum an empty array');
            return;
        }

        // Create a promise for each row summation
        const rowSumPromises = arr.map(row => 
            new Promise<number>((resolve) => {
                const rowSum = row.reduce((acc, num) => acc + num, 0);
                resolve(rowSum);
            })
        );

        // Execute all row sum calculations concurrently
        Promise.all(rowSumPromises)
            .then(rowSums => resolve(rowSums.reduce((acc, sum) => acc + sum, 0)))
            .catch(reject);
    });
}

// Example usage
const array2D_1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

sum2DArrayConcurrent(array2D_1)
    .then(result => console.log('Concurrent Sum:', result))
    .catch(error => console.error('Error:', error));

sum2DArrayConcurrent([])
    .then(result => console.log('Concurrent Sum:', result))
    .catch(error => console.error('Error:', error));
