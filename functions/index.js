'use strict';
global.fetch = require('node-fetch');
const functions = require('firebase-functions');

const cors = require('cors')({
    origin: true,
});

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const unsplash = new Unsplash({
    applicationId: functions.config().photo.access_key,
    secret: functions.config().photo.secret_key
});

exports.photo = functions.https.onRequest((req, res) => {
    if (req.method === 'PUT') {
        return res.status(403).send('Forbidden!');
    }



    let json = "{\"message\": \"OK\"}"
    return cors(req, res, () => {
        unsplash.photos.getRandomPhoto()
            .then(toJson)
            .then(json => {
                // res.json(json)
                console.log('Sending unsplsh json:', json);
                res.status(200).send(json);
            });
    });
});