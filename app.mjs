import jsonServer from 'json-server';
import express from 'express';
import util from 'util';
import fs from 'fs';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const promisedRead = util.promisify(fs.readFile);

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
function generateRandomBetween(min, max) {
    if (isNumeric(min) && isNumeric(max)) {
        return Math.floor(Math.random() * parseFloat(max)) + parseFloat(min)
    }
}

/**
 * returns random message defined in db.json
 */
server.get('/messages/random', async (req, res) => {
    const data = JSON.parse(await promisedRead('./db.json', 'utf-8'));
    const index = data.messages.findIndex(msg => {
        return msg.id === generateRandomBetween(0, Object.keys(data.messages).length);
    });

res.send(data.messages[index]);
});

server.use(middlewares);
server.use(express.static('public'));

server.use(router);

server.listen(3009, () => {
    console.log('listening to http://localhost:3009');
});

