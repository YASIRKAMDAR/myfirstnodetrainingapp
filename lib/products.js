var fs = require('fs');
var productdatafile = './data/products.data';

var request = require('request');

/**
 * get the list of top 4 products
 * @param { function } callback (error, response)  
 */
var gettop4products_old = function (callback) {
        fs.readFile(productdatafile, function(err,content){
            if(err) {
                callback(err);
            };
            var data = JSON.parse(content.toString());
            var results = data.results.slice(0,4);
            callback(undefined, {status: "SUCCESS", products: results});
        });
}

/**
 * api call to itunes
 * @param {function} callback (err,response, body) 
 */
var gettop4products = function (name, callback) {
    request("http://itunes.apple.com/search?term=" + name.toString() ,function(err,response, body) {
        if(err) {
            callback(err);
        };
        var data = JSON.parse(body.toString());
        var results = data.results.slice(0,4);
        callback(undefined, {status: "SUCCESS", products: results});
        
    });
}

module.exports = {gettop4products};