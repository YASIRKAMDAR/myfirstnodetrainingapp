var express = require('express');
var router = express.Router();
var { gettop4products } = require('../lib/products');

router.all("/*",function (req, res, next){
    next();
});

router.get("/listtop/:name", function (req, res, next) {
    gettop4products(req.params["name"], function(err,resp) {
       
    gettop4products(req.params["name"], function(err,resp) {
            if(err)
            res.json({status:"error", message:err.message });
            else
            res.json(resp);
        });
        if(err)
        res.json({status:"error", message:err.message });
    else
        res.json(resp);
    });
});



module.exports = router;