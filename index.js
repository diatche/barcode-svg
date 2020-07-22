let code = process.env.CODE;
let format = process.env.FORMAT;
let lastChar = process.env.SUFFIX;
let path = process.env.OUTPUT;

require('localenv');

code = code || process.env.CODE || '0000000000000';
format = format || process.env.FORMAT || 'ean13';
lastChar = lastChar || process.env.SUFFIX || '';
path = path || process.env.OUTPUT;

console.log(`Generating ${format.toUpperCase()} barcode for ${code}...`);

const fs = require('fs');
const Path = require('path');
const Barcode = require('jsbarcode');
const { DOMImplementation, XMLSerializer } = require('xmldom');

const xmlSerializer = new XMLSerializer();
const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

Barcode(svgNode, code, {
    xmlDocument: document,
    format,
    lastChar,
});

const svgText = xmlSerializer.serializeToString(svgNode);
const filename = `${code}-${format}.svg`;
path = path || Path.join(__dirname, filename);
fs.writeFileSync(path, svgText);

console.log(`Saved SVG to: ${path}`);
