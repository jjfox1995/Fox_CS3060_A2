var express = require('express');
var router = express.Router();

var fs      = require('fs');
var xml2js  = require('xml2js');
var parser  = new xml2js.Parser();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/booksJson', function(req, res, next) {

    var jsonFile = __dirname + "/../public/json/books.json";
    var obj = require("../public/json/books.json")["catalog"]["book"];
    console.log(obj);
    fs.readFile(jsonFile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        }else {
            var books = JSON.parse(text);
            books = books["catalog"]["book"];
            console.log(books);
            res.render('booksJson', { head: 'Book (JSON)', books:  books });

        }
    });
});

router.get('/booksJsonraw', function(req, res, next) {

    var jsonFile = __dirname + "/../public/json/books.json";
    fs.readFile(jsonFile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        }else {
            res.render('booksJsonraw', { head: 'Book (raw JSON)', file: text });
        }
    });
});


router.get('/booksxml', function(req, res, next) {

    var xmlfile = __dirname + "/../public/xml/books.xml";
    
    fs.readFile(xmlfile, "utf-8", function (error, text) {

        if (error) {
            throw error;
        }else {
            parser.parseString(text, function (err, result) {
                var books = result['catalog']['book'];
                // console.log(result);
                // console.log(result['bookstore']);
                console.log(books[0]);
                res.render('booksXML', { head: 'Book (XML)', books:  books });
            });
        }
    });
});

router.get('/booksxmlraw', function(req, res, next) {

    var xmlfile = __dirname + "/../public/xml/books.xml";
    
    fs.readFile(xmlfile, "utf-8", function (error, text) {
	
        if (error) {
            throw error;
        }else {
                res.render('booksXMLraw', { head: 'Book (XML Raw)', xmlFile: text});
        }
    });
});

router.get('/donutsxml', function(req, res, next) {

    var xmlfile = __dirname + "/../public/xml/donuts.xml";   
    fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        }else {
			parser.parseString(text, function (err, result) {
                var donuts = result["items"]["item"];
				res.render('donutsXML', { head: 'Donuts (XML)', donuts:  donuts});
            });
        }
    });
});

router.get('/donutsxmlraw', function(req, res, next) {

    var xmlfile = __dirname + "/../public/xml/donuts.xml";
    
    fs.readFile(xmlfile, "utf-8", function (error, text) {
	
        if (error) {
            throw error;
        }else {
                res.render('donutsXMLraw', { head: 'Donuts (XML Raw)', file: text});
        }
    });
});

	
router.get('/donutsJson', function(req, res, next) {
    
        var jsonFile = __dirname + "/../public/json/donuts.json";
        var obj = require("../public/json/donuts.json")["items"]["item"];
        console.log(obj);
        fs.readFile(jsonFile, "utf-8", function (error, text) {
            if (error) {
                throw error;
            }else {
                var donuts = JSON.parse(text);
                donuts = donuts["items"]["item"];
                res.render('donutsJson', { head: 'Donuts (JSON)', donuts:  donuts});
    
            }
        });
    });

router.get('/donutsjsonraw', function(req, res, next) {

    var jsonFile = __dirname + "/../public/json/donuts.json";
    fs.readFile(jsonFile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        }else {
            res.render('donutsJSONraw', {head: 'Donuts (raw JSON)', file: text });
        }
    });
});






module.exports = router;
