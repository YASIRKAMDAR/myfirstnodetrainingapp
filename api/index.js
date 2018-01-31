var express = require('express');
var router = express.Router();

/* used by all types and routes */
router.all('/*', function (req, res, next) {
    console.log('Accessing the all section ...')
    next()
});

/* generic get */
router.get('/', function(req, res, next) {
    console.log('Accessing the get section ...')
    res.send('respond with a resource');
});

/* post object */
router.post('/post', function (req, res) {
    res.render('index',{title: 'from post', value:'POST request to the homepage'})
});

/* Json response */
router.get('/json', function(req, res, next) {
    console.log('Accessing the /json section ...')
	res.json({key:'respond with a resource using nodemon suing dev script'});
});

/* parameters */
router.get('/json/fname/:param1/lastname/:param2', function (req, res,next) {
    res.send(req.params)
});

router.get('/json/name/:from-:to', function (req, res, next) {
    res.send(req.params)
});

router.get('/json/nameit/:from.:to', function (req, res, next) {
    res.send(req.params)
});

/** query string parameters */
router.get('/qstring', function (req, res, next) {
    res.send(req.query)
}); 

module.exports = router;