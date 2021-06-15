const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');

writeStream.on('finish', () => {
    console.log('파일 쓰기 완료');
})

writeStream.write('이 글을 씁니다.\n');
writeStream.write('이 글을 적어요.\n');
writeStream.write('다 적었습니다.\n');
writeStream.end();