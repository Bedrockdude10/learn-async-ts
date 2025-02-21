function logNegativeRows(arr: number[][]): Promise<void> {
    return new Promise((resolve, reject) => {
        if (arr.length === 0) {
            reject('Array is empty');
            return;
        }

        // Create a promise for each row check
        const rowCheckPromises = arr.map((row, index) => 
            new Promise<boolean>((resolve) => {
                const hasNegative = row.some(num => num < 0);
                resolve(hasNegative);
            }).then(hasNegative => {
                if (hasNegative) {
                    console.log(`Row ${index} contains negative numbers:`, row);
                }
            })
        );

        // Execute all row checks concurrently
        Promise.all(rowCheckPromises)
            .then(() => resolve())  // Resolve once all checks are done
            .catch(reject);  // Catch any errors
    });
}

// Example usage
const array2D_3 = [
    [1, 2, 3],
    [-4, 5, 6],
    [7, 8, -9],
    [10, 11, 12]
];

logNegativeRows(array2D_3)
    .then(() => console.log('Completed checking rows'))
    .catch(error => console.error('Error:', error));

logNegativeRows([])
    .then(() => console.log('Completed checking rows'))
    .catch(error => console.error('Error:', error));
