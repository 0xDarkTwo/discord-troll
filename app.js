const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors')

const dir = path.join(__dirname, 'public');

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.use(cors())

app.options('*', cors({origin: '*'}))

app.get('*', function (req, res) {
    if(req.get('user-agent').trim() == 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)' || req.get('user-agent').trim().substring(req.get('user-agent').length - 28).trim() == 'Gecko/20100101 Firefox/92.0') {
        var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
        if (file.indexOf(dir + path.sep) !== 0) {
            return res.status(403).end('Forbidden');
        }
        var type = mime[path.extname(file).slice(1)] || 'text/plain';
        var s = fs.createReadStream(file);
        s.on('open', function () {
            res.set('Content-Type', type);
            s.pipe(res);
        });
        s.on('error', function () {
            res.set('Content-Type', 'text/plain');
            res.status(404).end('Not found');
        });
    }
    else {
        var file = path.join(dir, 'osama.svg');
        if (file.indexOf(dir + path.sep) !== 0) {
            return res.status(403).end('Forbidden');
        }
        var type = mime[path.extname(file).slice(1)] || 'text/plain';
        var s = fs.createReadStream(file);
        s.on('open', function () {
            res.set('Content-Type', type);
            s.pipe(res);
        });
        s.on('error', function () {
            res.set('Content-Type', 'text/plain');
            res.status(404).end('Not found');
        });
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log(`Listening on http://localhost:${process.env.PORT || 3000}`);
});