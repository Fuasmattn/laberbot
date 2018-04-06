import jsonServer from "json-server";
import express from "express";
import util from "util";
import fs from "fs";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const promisedRead = util.promisify(fs.readFile);


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// const data = promisedRead(await ('./db.json', 'utf-8'));
const data = {
  messages: [
    {
      id: 0,
      color: "yellow",
      message: "Heute schon 1 flyen code geswaggert? (hackerman)",
      notify: false,
      message_format: "text"
    },
    {
      id: 1,
      color: "yellow",
      message: "I denk also i bims lol",
      notify: false,
      message_format: "text"
    },
    {
      id: 2,
      color: "yellow",
      message: "I bims 1 larry vong bot her",
      notify: false,
      message_format: "text"
    },
    {
      id: 3,
      color: "yellow",
      message: "Haaaaalt stop! (haltstop)",
      notify: false,
      message_format: "text"
    },
    {
      id: 4,
      color: "yellow",
      message: "Haaaaalt stop! (haltstop)",
      notify: false,
      message_format: "text"
    },
      {
          id: 5,
          color: "yellow",
          message: "I speib glei (confusedparrot)",
          notify: false,
          message_format: "text"
      }
      ,
      {
          id: 6,
          color: "yellow",
          message: "(picklerick) I'm a pickle!",
          notify: false,
          message_format: "text"
      },
      {
          id: 7,
          color: "yellow",
          message: "Fake nuuuuuuus (trumpchina)",
          notify: false,
          message_format: "text"
      },
      {
          id: 8,
          color: "yellow",
          message: "(badass) Kenn de wieda!",
          notify: false,
          message_format: "text"
      }
  ]
};

/**
 * returns random message defined in db.json
 */
server.post("/messages/random", async (req, res) => {
  // const index = data.messages.findIndex(msg => {
  //   // return msg.id === generateRandomBetween(0, Object.keys(data.messages).length-1);
  //   return msg.id === randomIntFromInterval(0, 4);
  // });
  const _m = data.messages[randomIntFromInterval(0, 8)];
  const message = {
    color: _m.color,
    message_format: "text",
    notify: _m.notify,
    message: _m.message
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(message));
});

server.use(middlewares);
server.use(express.static("public"));

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Laberbot is running on port ${PORT}`);
});
