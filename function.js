"use strict";

const request = require("request");
const escapeHtml = require("escape-html");
let latestNum = 1;
let visitedCounter = [];

function formXKCD(body) {
    body = JSON.parse(body);

    if(body.num > latestNum){
        latestNum = body.num;
    }
    
    const img = body.img;
    const alt = body.alt;
    const title = body.title;
    const prev = body.num == 1 ? 1 : body.num - 1;
    const next = body.num == latestNum ? body.num : body.num + 1;
    const date = body.year + "/" + body.month + "/" + body.day;
    const random = Math.floor(Math.random() * latestNum) + 1; 
    const currentCount = visitedCounter[body.num] ? visitedCounter[body.num] : 0;
    visitedCounter[body.num] = currentCount + 1;
    const counter = visitedCounter[body.num];

    const xkcdItems = {
        alt,
        next,
        prev,
        img,
        title,
        date,
        random,
        counter
    };

    return Object.keys(xkcdItems).reduce((item, key) => {
        item[key] = escapeHtml(xkcdItems[key]);
        return item;
    }, {});
}

module.exports = function(id) {
  const url = `https://xkcd.com/${id}/info.0.json`;
  return new Promise(function(resolve, reject) {
    request(url, function(err, response, body) {
      if (!err && response.statusCode === 200) {
        return resolve(
          Object.assign(
            formXKCD(body)
          )
        );
      }
      reject(JSON.stringify(response));
    });
  });
};