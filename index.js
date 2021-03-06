`use strict`

const express = require(`express`);
const app = express();
const port = process.env.port || 8080;
const data = require(`./readData`)

app.use(express.static(`public`));
app.use(`/scripts`, express.static(__dirname + `/node_modules`))

let file = [];
data(d => {
    file.push(d)
});

app.get(`/data`, (req, res) => {
    res.send(file);
});

app.listen(port)