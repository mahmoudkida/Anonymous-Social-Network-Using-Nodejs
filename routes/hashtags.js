var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var hashtags = require('../models/hashtag');
var posts = require('../models/post');
var router = express.Router();
router.use(bodyParser.json());
var Verify = require('./verify');


router.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        hashtags.find()
            .exec(function (err, hashtags) {
                if (err) throw err;
                res.json(hashtags);
            });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        hashtags.create(req.body, function (err, hashtag) {
            if (err) throw err;
            console.log('hashtag created!');
            var id = hashtag._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the hashtag with id: ' + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        hashtags.findByIdAndRemove(req.params.userId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

router.route('/:hashtagId')
    .get(function (req, res, next) {
        posts.find({
            hashtag: req.params.hashtagId
        }).exec(function (err, posts) {
            if (err) throw err;
            res.json(posts);
        });

    });

module.exports = router;
