var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var posts = require('../models/post');

var router = express.Router();
router.use(bodyParser.json());
var Verify = require('./verify');
router.route('/:userId')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        posts.find({
                by: req.params.userId
            })
            .populate('comments.postedBy')
            .exec(function (err, posts) {
                if (err) throw err;
                res.json(posts);
            });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        posts.create(req.body, function (err, post) {
            if (err) throw err;
            console.log('Post created!');
            var id = post._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the post with id: ' + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        posts.findByIdAndRemove(req.params.userId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
router.route('/:postId/comments')
    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        posts.findById(req.params.postId)
            .populate('comments.postedBy')
            .exec(function (err, post) {
                if (err) throw err;
                res.json(post.comments);
            });
    })

    .post(function (req, res, next) {
        posts.findById(req.params.postId, function (err, post) {
            if (err) throw err;
            req.body.postedBy = req.decoded._doc._id;
            post.comments.push(req.body);
            post.save(function (err, post) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(post);
            });
        });
    })

    .delete(function (req, res, next) {
        posts.findById(req.params.postId, function (err, post) {
            if (err) throw err;
            for (var i = (post.comments.length - 1); i >= 0; i--) {
                post.comments.id(post.comments[i]._id).remove();
            }
            post.save(function (err, result) {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all comments!');
            });
        });
    });


router.route('/:postId/comments/:commentId')
    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        posts.findById(req.params.postId)
            .populate('comments.postedBy')
            .exec(function (err, postId) {
                if (err) throw err;
                res.json(post.comments.id(req.params.commentId));
            });
    })

    .put(function (req, res, next) {
        // We delete the existing commment and insert the updated
        // comment as a new comment
        posts.findById(req.params.postId, function (err, post) {
            if (err) throw err;
            post.comments.id(req.params.commentId).remove();
            req.body.postedBy = req.decoded._doc._id;
            post.comments.push(req.body);
            post.save(function (err, post) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(post);
            });
        });
    })

    .delete(function (req, res, next) {
        posts.findById(req.params.postId, function (err, post) {
            if (post.comments.id(req.params.commentId).postedBy !=
                req.decoded._doc._id) {
                var err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }
            post.comments.id(req.params.commentId).remove();
            post.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });
module.exports = router;
