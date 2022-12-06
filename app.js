const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
// app.listen(5000);

app.get("", (_, res) => {
  res.sendFile(`${publicPath}/index.html`);
});

app.get("/format-question", (_, res) => {
  res.sendFile(`${publicPath}/FormatQuestionFile.html`);
});

app.get("/list_questions-import", (_, res) => {
  res.sendFile(`${publicPath}/list_questions-import.txt`);
});

app.get("/list_answers-import", (_, res) => {
  res.sendFile(`${publicPath}/list_answers-import.txt`);
});

module.exports = app;
