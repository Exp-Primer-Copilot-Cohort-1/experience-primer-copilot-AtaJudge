// Create web server

// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Load models
const Comments = require('../models/comments');

// Load router
const commentRouter = express.Router();

// Configure router
commentRouter.use(bodyParser.json());

// Configure router to handle GET requests to root path
commentRouter.route('/')
    .get((req, res, next) => {
        Comments.find({})
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Comments.create(req.body)
            .then((comment) => {
                console.log('Comment created ', comment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    .delete((req, res, next) => {
        Comments.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// Configure router to handle GET, PUT, DELETE requests to specific comment
commentRouter.route('/:commentId')
    .get((req, res, next) => {
        Comments.findById(req.params.commentId)
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /comments/${req.params.commentId}`);
    })
    .put((req, res, next) => {
        Comments.findByIdAndUpdate(req.params.commentId, {
            $set: req.body
        }, { new: true })
            .then((comment) => {