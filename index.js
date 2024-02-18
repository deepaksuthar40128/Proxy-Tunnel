const http = require('http');
const https = require('https');
const { config } = require('dotenv'); 
config();
const aPort = 3000;
http.createServer((req, res) => {
    const bHost = process.env.HOST;
    const bPort = process.env.PORT;
    const isHttps = process.env.isHTTPS;
    bPath = req.url;
    const options = {
        hostname: bHost,
        path: bPath,
        port: bPort,
        method: req.method,
        headers: req.headers,
        rejectUnauthorized: false
    }; 
    let hostMethod = http;
    if (isHttps) hostMethod = https;
    const proxyReq = hostMethod.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });

    req.pipe(proxyReq);
})
    .listen(aPort, () => {
        console.log(`Server listening on port ${aPort}`);
    });
