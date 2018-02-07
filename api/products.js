var express = require('express');
var router = express.Router();
var { gettop4products, getproductsbyname } = require('../lib/products');

router.all("/*",function (req, res, next){
    next();
});

router.get("/listtop", function (req, res, next) {
    gettop4products(function(err,resp) {
        if(err)
          res.json({status:"error", message:err.message });
        else
          res.json(resp);
    });
});

router.get("/list/:name", function (req, res, next) {
    getproductsbyname(req.params["name"], function(err,resp) {
        if(err)
          res.json({status:"error", message:err.message });
        else
          res.json(resp);
    });
});


module.exports = router;