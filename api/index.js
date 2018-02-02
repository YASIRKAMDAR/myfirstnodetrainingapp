var express = require('express');
var router = express.Router();
var fs = require('fs');

/* used by all types and routes */
/* router.all('/', function (req, res, next) {
    console.log('Accessing the all section nodemon...')
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
})
     */

/* api  request. */
router.get('/', function(req, res, next) {
    res.send('my first api string change with nodemon');
});

/* Json response */
router.get('/json', function(req, res, next) {
    console.log('Accessing the /json section ...')
    res.json({key:'respond with a resource using nodemon suing dev script'});
});

/* parameters */
router.get('/json/name/:param1-:param2', function (req, res) {
    res.send(req.params)
})
    
/** query string parameters */
router.get('/qstring', function (req, res, next) {
    res.send(req.query)
}); 

/* post object */
router.post('/post', function (req, res) {
    //res.send("in post call")
    res.render('index',{title: 'from post', value:'POST request to the homepage'})
});
    

module.exports = router;