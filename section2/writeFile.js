const fs = require('fs').promises;

fs.writeFile('./section2/writeme.txt', '글이 입력됩니다.')
    .then(() => {
        return fs.readFile('./section2/writeme.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });