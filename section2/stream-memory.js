const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

// 스트림 방식으로 파일을 옮기는 코드
const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
    console.log('stream: ', process.memoryUsage().rss);
})