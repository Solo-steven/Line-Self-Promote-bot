const line = require('@line/bot-sdk');
const config = require('./config.json');

const client = new line.Client({
  channelAccessToken: config.token
});

module.exports  = client;