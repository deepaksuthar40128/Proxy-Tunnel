const http = require('http');
const { config } = require('dotenv');
config();
const aPort = 3000;
http.createServer((req, res) => {
    const bHost = process.env.HOST;
    const bPort = process.env.PORT;
    bPath = req.url;
    const options = {
        hostname: bHost,
        path: bPath,
        port: bPort,
        method: req.method,
        headers: req.headers
    };

    const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });

    req.pipe(proxyReq);
})
    .listen(aPort, () => {
        console.log(`Server listening on port ${aPort}`);
    });
