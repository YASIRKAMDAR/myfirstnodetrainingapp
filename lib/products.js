var fs = require('fs');
var productdatafile = './data/products.data';

var request = require('request');

/**
 * get the list of top 4 products
 * @param { function } callback (error, response)  
 */
var gettop4products_fs = function (callback) {
    try {
        fs.readFile(productdatafile, function(err,content){
            if(err) {
                callback(err);
            };
            var data = JSON.parse(content.toString());
            var results = data.results.slice(0,4);
            callback(undefined, {status: "SUCCESS", products: results});
        });
    } catch (error) {
        console.log(error);
        callback(err);            
    }
}

/**
 * get the list of top 4 products
 * @param { function } callback (error, response)  
 */
var gettop4products = function (cb) {
    request('https://itunes.apple.com/search?entity=album&term=kishore', function (error, response, body) {
        if(error) 
        { 
            cb(error);
            return;
        }
        var data = JSON.parse(body.toString());
        var results = data.results.slice(0,4);
        cb(undefined, {status: "SUCCESS", products: results});
        
    });
}

/**
 * get the list of top 4 products
 * @param { function } callback (error, response)  
 */
var getproductsbyname = function (name, cb) {
    var url = 'http://itunes.apple.com/search?entity=album&term='+ name.toString();
    request(url, function (error, response, body) {
        if(error) 
        { 
            cb(error);
            return;
        }
        var data = JSON.parse(body.toString());
        var results = data;
        cb(undefined, {status: "SUCCESS", products: results});
        
    });
}

module.exports = {gettop4products, getproductsbyname};