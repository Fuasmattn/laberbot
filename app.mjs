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
    const _m = data.messages[index];
const message = {"color": _m.color, "message_format": "text", "notify": _m.notify, "message" : _m.message };
res.send(message);
});

server.use(middlewares);
server.use(express.static('public'));

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});


