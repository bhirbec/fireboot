const path = require('path')
const read = require('fs').readFileSync
const jsx = require('react-jsx')

const templates = {}

function renderHTML(req, res, Content) {
    const context = {}
    context.Content = Content
    context.asset = req.assetFingerprint

    const layout = loadTemplate('layout.jsx')
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<!DOCTYPE html>\n' + layout(context, {html: true}));
}

function loadTemplate(filePath) {
    const temp = templates[filePath];
    if (temp === undefined) {
        const str = read(path.join(__dirname, filePath), 'utf-8')
        templates[filePath] = jsx.server(str, {raw: true})
    }
    return templates[filePath]
}

module.exports = renderHTML;
