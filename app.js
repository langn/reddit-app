const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use(require('./app/routes.js'));

const port = process.env.port || 3000;
app.listen(port);

console.info(`App running on port ${port}`);
