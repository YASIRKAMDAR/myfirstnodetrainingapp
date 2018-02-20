var express = require('express');
var router = express.Router();
var { getusers, adduser, loginuser, checkuser } = require('../lib/users');

router.all("/*",function (req, res, next){
    next();
});

router.post("/register", function (req, res, next) {
      var user = {
        id:req.body.username.toLowerCase(),
        email:req.body.email.toLowerCase(),
        password:req.body.password
      };

      adduser(user, function(err,resp) {
          if(err)
            res.json({status:"error", message:err.message });
          else
            res.json(resp);
      });
}).get('/register', function(req, res, next) {
  res.render('user/register', { title: 'Register on MyApp', extrareg: "extra on the register banner"  });
});

router.get("/list", function (req, res, next) {
      getusers(function(err,resp) {
          if(err)
            res.json({status:"error", message:err.message });
          else
            res.json(resp);
      });
});

router.post("/login", function (req, res, next) {
    var user = {
      userid:req.body.userid.toLowerCase(),
      password:req.body.password
    };

    loginuser(user, function(err,resp) {
        if(err)
          res.json({status:"error", message:err.message });
        else
          res.json(resp);
    });
}).get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Login to MyApp', extra: "extra on the &lg; banner &gt;", layout: "layouts/mycustom" });
});;

router.get("/checkuser/:userid", function (req, res, next) {
    checkuser(req.params.userid.toLowerCase(), undefined , function(err,resp) {
        if(err)
          res.json({status:"error", message:err.message });
        else
          res.json(resp);
    });
});

router.get("/checkemail/:email", function (req, res, next) {
    checkuser(undefined, req.params.email.toLowerCase(), function(err,resp) {
        if(err)
          res.json({status:"error", message:err.message });
        else
          res.json(resp);
    });
});

module.exports = router;