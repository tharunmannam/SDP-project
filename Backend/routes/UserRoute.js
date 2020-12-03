const express=require('express');

const router=express.Router();

const User=require('../models/User');

router.route('/getUsers').get((req,res,next) => {
    User.find({})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error({'Error':'No details found'});
            throw err;
        }
        else
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route('/getresponce/:email/:password').get((req,res,next) => {
    User.find({$or: [ { username: req.params.email }, { email: req.params.email }] ,password : req.params.password})
    .then((resp) => {
        if(resp.length==0)
        {
            const err=new Error({'Error':'No details found'});
            throw err;
        }
        else
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route('/addUser').post((req,res,next) => {
    User.find({username: req.body.username,email: req.body.email,password: req.body.password})
    .then((resp) => {
        if(resp.length ==0)
        {
            User.create(req.body)
            .then((resp) => {
                console.log('new responce ', resp);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else
        {
            const err=new Error('You are already a user');
            return next(err);
        }
    })
    .catch((err) => next(err));
});

router.route('/update/:id').put((req,res,next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route('/delete/:username').delete((req,res,next) =>{
    User.findOneAndDelete({username: req.params.username})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports=router;