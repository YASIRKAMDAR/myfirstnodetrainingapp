var fs = require('fs');
var productdatafile = './data/products.data';

/**
 * get the list of top 4 products
 * @param { function } callback (error, response)  
 */
var gettop4products = function (callback) {
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

module.exports = {gettop4products};