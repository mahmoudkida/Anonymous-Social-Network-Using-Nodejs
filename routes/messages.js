var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var messages = require('../models/message');

var router = express.Router();
router.use(bodyParser.json());
var Verify = require('./verify');
router.route('/:userId')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        messages.find({
                to: req.params.userId
            })
            .populate('msg.from')
            .exec(function (err, messages) {
                if (err) next(err);
                res.json(messages);
            });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        messages.create(req.body, function (err, message) {
            if (err) next(err);
            console.log('message created!');
            var id = message._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the message with id: ' + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        messages.findByIdAndRemove(req.params.userId, function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
router.route('/:messageId/msg')
    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        messages.findById(req.params.messageId)
            .populate('msg.from')
            .exec(function (err, message) {
                if (err) next(err);
                res.json(message.msg);
            });
    })

    .post(function (req, res, next) {
        messages.findById(req.params.messageId, function (err, message) {
            if (err) next(err);
            req.body.from = req.decoded._id;
            message.msg.push(req.body);
            message.save(function (err, message) {
                if (err) next(err);
                console.log('Updated msg!');
                res.json(message);
            });
        });
    })

    .delete(function (req, res, next) {
        messages.findById(req.params.messageId, function (err, message) {
            if (err) next(err);
            for (var i = (message.msg.length - 1); i >= 0; i--) {
                message.msg.id(message.msg[i]._id).remove();
            }
            message.save(function (err, result) {
                if (err) next(err);
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all msg!');
            });
        });
    });


router.route('/:messageId/msg/:commentId')
    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        messages.findById(req.params.messageId)
            .populate('msg.from')
            .exec(function (err, messageId) {
                if (err) next(err);
                res.json(message.msg.id(req.params.commentId));
            });
    })

    .put(function (req, res, next) {
        // We delete the existing commment and insert the updated
        // comment as a new comment
        messages.findById(req.params.messageId, function (err, message) {
            if (err) next(err);
            message.msg.id(req.params.commentId).remove();
            req.body.from = req.decoded._id;
            message.msg.push(req.body);
            message.save(function (err, message) {
                if (err) next(err);
                console.log('Updated msg!');
                res.json(message);
            });
        });
    })

    .delete(function (req, res, next) {
        messages.findById(req.params.messageId, function (err, message) {
            if (message.msg.id(req.params.commentId).from !=
                req.decoded._id) {
                var err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }
            message.msg.id(req.params.commentId).remove();
            message.save(function (err, resp) {
                if (err) next(err);
                res.json(resp);
            });
        });
    });
module.exports = router;
