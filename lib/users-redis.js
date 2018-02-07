var fs = require('fs');
var userdatafile = './data/login.data';
var redis = require('redis');
var client = redis.createClient(19124,"redis-19124.c1.asia-northeast1-1.gce.cloud.redislabs.com");

client.on('connect', function() {
  console.log('redis connected');
});

/**
 * get the list of users
 * @param { function } callback (error, response)  
 */
var getusers = function (callback) {
    client.
        fs.readFile(userdatafile,function(err,content){
            if(err) {
                callback(err);
            };
            var data = JSON.parse(content.toString());
            callback(undefined, data);
        });
}

/**
 * add the lsit of users 
 * @param { JSON }  user  JSON -  { id: (string - req), email:(string - req), password:(string - req) }
 * @param { function } callback (error, response) 
 */
var adduser = function(user, callback) {
    fs.readFile(userdatafile ,function(err,content){
        if(err) {
            callback(err);
        }
        try {
            var data = JSON.parse(content.toString());
            checkuser(user.id, undefined, function (err, resp) {
                if(resp.status === "AVAILABLE")
                {
                    checkuser(undefined, user.email, function (err, resp) {
                        if(resp.status === "AVAILABLE")
                        {
                            data.users.push(user);
                            fs.writeFile(userdatafile,JSON.stringify(data),function(err){
                                if(err) {
                                    callback(err);
                                };
                                callback(undefined,{status:"SUCCESS"});
                            });                
                        }
                        else {
                            callback(undefined,{status:"FAILED",message:"email already registered"});
                        }
                    });
                }
                else{
                    callback(undefined,{status:"FAILED",message:"username already Taken"});
                }
            });
        } catch (error) {
            console.log(error);
            callback(error);
        }
    });
}

/**
 * loginuser --> User login service 
 * @param {JSON} requser Json request { userid:(string - req), password:(string - req)}; 
 * @param { function } callback (error, response)
 */
var loginuser = function (requser, callback) {
    try {
        fs.readFile(userdatafile, function(err,content){
            if(err) {
                callback(err);
            };
            var data = JSON.parse(content.toString());
            var fuser = data.users.filter(function (user) {
                return ((user.id === requser.userid || user.email === requser.userid) && user.password === requser.password);
            })[0];
            
            if(fuser) {
                callback(undefined, {status:"LOGGEDIN", message:"logged in!", user: fuser});
            }
            else
            {
                callback(undefined, {status:"NOTLOGGEDIN", message:"not found", user:undefined});
            }
        });
    } catch (error) {
        console.log(error);
        callback(err);            
    }
}

/**
 * checkuser - check user email or id already exists
 * @param {string} userid 
 * @param {string} email 
 * @param { function } callback (error, response)
 */
var checkuser = function (userid, email, callback) {
    fs.readFile(userdatafile, function(err,content){
        if(err) {
            callback(err);
        };
        try {
            var data = JSON.parse(content.toString());
            var fuser = data.users.filter(function (user) {
                if(userid) {
                    return user.id === userid;
                }
                else {
                    return  user.email === email
                }
            })[0];
            
            if(fuser) {
                callback(undefined, {status:"TAKEN", message:"Userid/email is taken!"});
            }
            else
            {
                callback(undefined, {status:"AVAILABLE", message:"Userid/email is available"});
            }
        } catch (error) {
            console.log(error);
            callback(err);            
        }
    });
}

module.exports = {getusers, adduser, loginuser, checkuser};