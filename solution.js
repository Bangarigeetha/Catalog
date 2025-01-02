const fs = require('fs');

// Function to decode value based on the base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to calculate Lagrange Interpolation and find the constant term
function lagrangeInterpolation(points, k) {
    let c = 0;

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let term = yi;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                term *= -xj / (xi - xj);
            }
        }

        c += term;
    }

    return Math.round(c); // Ensure the result is an integer
}

// Main function to process input JSON
function findSecretConstant(filePath) {
    const input = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const { n, k } = input.keys;

    let points = [];
    for (let key in input) {
        if (key !== 'keys') {
            const x = parseInt(key);
            const { base, value } = input[key];
            const y = decodeValue(parseInt(base), value);
            points.push({ x, y });
        }
    }

    // Sort points by x value (optional but helpful for debugging)
    points.sort((a, b) => a.x - b.x);

    // Use first k points for interpolation
    return lagrangeInterpolation(points, k);
}

// Run for both test cases
console.log("Secret for Test Case 1:", findSecretConstant('./testcase1.json'));
console.log("Secret for Test Case 2:", findSecretConstant('./testcase2.json'));
