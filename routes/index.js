var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', layout: false });
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Login to MyApp', extra: "extra on the banner", layout: "layouts/mycustom" });
});

router.get('/register', function(req, res, next) {
  res.render('user/register', { title: 'Register on MyApp', extrareg: "extra on the register banner"  });
});

module.exports = router;
