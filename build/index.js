// const http = require('http');

// const hostname = 'localhost';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const express = require("express");
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.listen(5000);

app.get('', (_, res) => {
    res.sendFile(`${publicPath}/index.html`);
});

app.get('/format-question', (_, res) => {
    res.sendFile(`${publicPath}/FormatQuestionFile.html`);
});

app.get('/list_questions-import', (_, res) => {
    res.sendFile(`${publicPath}/list_questions-import.txt`);
});

app.get('/list_answers-import', (_, res) => {
    res.sendFile(`${publicPath}/list_answers-import.txt`);
});