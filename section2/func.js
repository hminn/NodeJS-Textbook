// const { odd, even } = require('./var'); => 노드의 모듈 시스템
import { odd, even } from './var.js';

function checkOddorEven(number) {
    if (number % 2) {
        return odd;
    } else {
        return even;
    }
}

export default checkOddorEven;