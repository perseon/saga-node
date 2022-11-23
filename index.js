// var convert = require('xml-js');
// var xml = require('fs').readFileSync('fact.xml', 'utf8');
// var options = {ignoreComment: true, alwaysChildren: true};
// var result = convert.xml2js(xml, options); // or convert.xml2json(xml, options)
// str = JSON.stringify(result, null, 4); // (Optional) beautiful indented output.
// console.log(str)

var convert = require('xml-js');
var xml = require('fs').readFileSync('fact.xml', 'utf8');
var options = {ignoreComment: true, alwaysChildren: true, compact: true};
var result = convert.xml2js(xml, options); // or convert.xml2json(xml, options)
//console.log(result);
result.Facturi.Factura.Antet.FurnizorNume = "Abc"

var json = JSON.stringify(result)
console.log(json);

// var convert = require('xml-js');
// var json = require('fs').readFileSync('fact.json', 'utf8');
var options = {compact: true, ignoreComment: true, spaces: 4};
var result = convert.json2xml(json, options);
//console.log(result);