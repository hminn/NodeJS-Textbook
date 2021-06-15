const http = require('http');

http.createServer( async (req, res) => {
    const cookies = await req.headers.cookie.split(";");
    console.log(req.url);
    console.log(cookies);
    res.writeHead(200, { 'Set-Cookie': 'mycookie=test'});
    res.end("Hello Cookie");
})
    .listen(8083, () => {
        console.log("8083번 포트에서 서버가 대기중입니다.")
    })