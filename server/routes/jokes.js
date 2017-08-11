var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.post('/postJoke', function(req, res) {
    console.log('post req.body: ' + req.body);

    pool.connect(function (errorConnectingToDatabase, client, done) {
        done();
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database: ', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('INSERT into jokes (whoseJoke, jokeQuestion, punchLine) VALUES ($1, $2, $3)', [req.body.whoseJoke, req.body.jokeQuestion, req.body.punchLine], function (errorMakingQuery, result) {
                if (errorMakingQuery) {
                    console.log('Error making query: ', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.get('/getJokes', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, client, done) {
        done();
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database: ', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM jokes', function(errorMakingQuery, result) {
                if (errorMakingQuery) {
                    console.log('Error making query: ', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    });
});

module.exports = router;