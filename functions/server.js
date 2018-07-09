const path = require('path')
const express = require('express');
const staticAsset = require('static-asset');
const renderHTML = require('./template');

const app = express()
app.use(staticAsset(path.join(__dirname,  "../public/")))

app.get('*', (req, res) => {
    renderHTML(req, res);
});

module.exports = app;
