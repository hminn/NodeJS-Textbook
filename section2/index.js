// const { odd, even } = require('./var');
// const checkNumber = require('./func');
import { odd, even } from './var.js';
import { default as checkNumber } from './func.js';

function checkStringOddOrEven(str) {
    if (str.length % 2) { // 홀수면
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));