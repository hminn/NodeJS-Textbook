const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    console.log("모든 요청에 대해서 실행이 됩니다요")
    next();
})

app.get('/', (req, res, next) => {
    if (req.params) {
        next('route');
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
        next();
    }
}, (req, res) => {
    console.log("req.params 가 없는 경우");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log("req.params 가 있는 경우")
});

app.post('/', (req, res) => {
    res.send("Hello Express!");
})

app.get('/about', (req, res) => {
    res.send("Hello Express@@ /about");
});

app.use((err, req, res, next) => {
    console.log(err);
    if (err) {
        console.error(err);
        res.status(200).send("에러가 났지만 코드는 안알려줘");
    }
    else {
        next()
    }
})

app.listen(3000, () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})