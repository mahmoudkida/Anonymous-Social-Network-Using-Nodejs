var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');


router.route('/')
    .get(Verify.verifyAdmin, function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) {
                return next(err);
            }
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
        debugger;
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
