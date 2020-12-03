const express=require('express');

const Brouter=express.Router();

const BookEvent=require('../models/Bookevent');

Brouter.route('/getEvents').get((req,res,next) => {
    BookEvent.find({})
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

Brouter.route('/getBooks/:username').get((req,res,next) => {
    BookEvent.find({username: req.params.username})
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

Brouter.route('/bookevent').post((req,res,next) => {
    BookEvent.create(req.body)
    .then((resp) => {
        console.log('new responce ', resp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

Brouter.route('/update/:username').put((req,res,next) => {
    BookEvent.findOneAndUpdate({username : req.params.username}, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

Brouter.route('/delete/:username').delete((req,res,next) =>{
    BookEvent.findOneAndDelete({username: req.params.username})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports=Brouter;