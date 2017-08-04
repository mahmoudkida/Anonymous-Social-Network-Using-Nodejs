var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var extend = require('extend');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        //+ '-' + Date.now()+ path.extname(file.originalname)
        cb(null, file.originalname+ '-' + Date.now()+ path.extname(file.originalname))
    }
});
// set the directory for the uploads to the uploaded to
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({ storage: storage }).single('file');



router.route('/getUsersList')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        User.find({}).sort("-createdAt").limit(10).exec(function (err, users) {
            if (err) {
                return next(err);
            }
            users.forEach(function (user,index) {
                if (user._id ==  req.decoded._id){
                    users.splice(index,1);
                }
            });
            res.json(users);
        })
    });

router.route('/userInfo')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        User.find({
            '_id': req.decoded._id
        }, function (err, user) {
            if (err) {
                return next(err);
            }
            res.json(user);
        })
    });

router.route('/userInfo/:userId')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        User.find({
            '_id': req.params.userId
        }, function (err, user) {
            if (err) {
                return next(err);
            }
            res.json(user);
        })
    });
router.route('/updateInfo')
    .put(Verify.verifyOrdinaryUser, function (req, res, next) {
        User.findOneAndUpdate({
            '_id': req.decoded._id
        },req.body,{new: true}, function (err, user) {
            if (err) {
                return next(err);
            }
            res.json(user);

        })
    });
router.route('/updatePicture')
    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        upload(req, res, function (err) {
            if (err) {
                return next(err);
            }
            var path = '';
            // No error occured.
            path = req.file.path.replace(/\\/g,"/").replace('public/','static/');
            User.findOneAndUpdate({
                '_id': req.decoded._id
            },{picture : path},{new: true}, function (err, user) {
                if (err) {
                    return next(err);
                }
                res.json(user.picture);

            })
        });

    });
router.route('/updatePassword')
    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        User.find({
            '_id': req.decoded._id
        },{password:1}, function (err, user) {
            if (err) {
                return next(err);
            }
            if(user.password != req.body.oldPassword){
                return next({
                    err : 'Old Password is wrong'
                })
            }
            else{
                user.password =  req.body.newPassword;
                user.save(function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        success : 'Password Updated Successfully'
                    });
                });
            }
        })

    });
router.post('/register', function (req, res) {
    User.register(new User(req.body),
        req.body.password,
        function (err, user) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            user.save(function (err, user) {
                passport.authenticate('local')(req, res, function () {
                    var token = Verify.getToken({
                        "username": user.username,
                        "_id": user._id,
                        "admin": user.admin
                    });
                    return res.status(200).json({
                        status: 'Registration Successful!',
                        success: true,
                        token: token
                    });
                });
            });
        });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            user.lastLoginDate = new Date();

            var token = Verify.getToken({
                "username": user.username,
                "_id": user._id,
                "admin": user.admin
            });
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});


module.exports = router;
