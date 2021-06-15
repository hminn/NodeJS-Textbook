const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

// 버퍼 통째로 옮기는 방식
// 이 경우에는 서버 메모리가 1GB 정도 필요할 것이다.
const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);
console.log('buffer: ', process.memoryUsage().rss);