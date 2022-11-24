var convert = require('xml-js');

var xml = require('fs').readFileSync('./fact_orig.xml', 'utf8');

result = convert.xml2json(xml, {compact: true});

console.log(result)