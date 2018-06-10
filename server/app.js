/*
 * Module dependencies;
 */
const express = require('express');
const nunjucks = require('nunjucks');
const engines = require('consolidate');
const _ = require('lodash');
const path = require('path')
const router = require('./routes');

const pagedown = require("pagedown"),
    pagedownExtra = require("./lib/pagedown-extra").Extra,
    converter = new pagedown.Converter(),
    safeConverter = new pagedown.getSanitizingConverter();

// markdown support Just Same As UI
pagedownExtra.init(converter, { extensions: "all" });
pagedownExtra.init(safeConverter, { extensions: "all" });

const app = express(); // define express app instance
//define config
global.CONFIG = require('./config');
global.templatePath = path.join(__dirname, '../', 'client');

// define nunjucks configure and views for template path
app.set('view engine', 'html');
app.engine('html', engines.nunjucks);
const env = nunjucks.configure(templatePath, {
    autoescape: true,
    express: app,
    tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>'
      }
});

// nunjucks environments to add filer
// const env = new nunjucks.Environment();

env.addFilter('toHtml', function(markdown) {

    return (markdown) ? converter.makeHtml(markdown) : markdown;
});

env.addFilter('toSafeHtml', function(markdown) {
    return (markdown) ? safeConverter.makeHtml(markdown) : markdown;
});
/*
 * Render static css,images, js
 */
// const _cssPath = path.join(templatePath, 'css');
// const jsPath = path.join(templatePath, 'js');
// const imagesPath = path.join(templatePath, 'images');
// app.use('/css', express.static(_cssPath));
// app.use('/js', express.static(jsPath));
// app.use('/images', express.static(imagesPath));
app.use('/static', express.static(path.join(templatePath, 'public'), {}))

// define template path to show data
module.exports = {
    start: function() {
        const PORT = process.env.PORT || 8080;
        console.log("App is listening on port: ", PORT);
        app.listen(PORT); // server should listen on port
        app.use('/', router);
    }
}