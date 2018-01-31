var express = require('express');
var router = express.Router();
var fs = require('fs');

/* used by all types and routes */
router.all('/*', function (req, res, next) {
    console.log('Accessing the all section ...');
   
    fs.readFile('./data/login.data',function(err,content){
        if(err) throw err;
        var data = JSON.parse(content.toString());
        var users = data.users;
        var user = {
            id:"Yasir1",
            email:"YasirKamdar1@gmail.com",
            password:"abc@1231"
        };
        data.users.push(user);
        console.log(data)
        fs.writeFile('./data/login.data',JSON.stringify(data),function(err){
          if(err) throw err;
        })
      })
      next()
});

/* generic get */
router.get('/', function(req, res, next) {
    console.log('Accessing the get section ...')
    fs.readFile('./data/login.data',function(err,content){
        if(err) throw err;
        res.send(content.toString());
    });
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