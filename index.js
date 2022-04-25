const https = require('https');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bot = require('./bot.js');
const config = require('./config.json');
const userModel = require('./model/user');
const { createTextMessage, createMenuMessage } = require('./messages');
const nfa = require('./NFA');

app.use(express.json());
app.use(express.urlencoded())

app.post("/", async (req, res) => {
    if (!req.body || !req.body.events) 
        return res.status(200).json();
    for(const event of req.body.events) {
        /** Step01: Throw Not Text Message Type */
        if(event.type !== "message" || event.message.type !== "text") {
            await bot.pushMessage(
                event.source.userId,
                createTextMessage("抱歉，目前的 chatbot 還笨笨的，對這個訊息我不知道要回什麼 XD")
            )
            continue;
        }
        /** Step02: if user first talk */
        const users = await userModel.find({ id: event.source.userId });
        if(users.length === 0) {
            console.log(`New User ${event.source.userId} is coming.`);
            const user = new userModel();
            user.id = event.source.userId;
            user.timestamp = Date.now();
            user.state = "INIT";
            await bot.replyMessage(
                event.replyToken,
                createMenuMessage("哈囉，我是來自成功資工三年級的李廷偉，想更認識我的話，可以點一下下面的選項喔！！")
            );
            await user.save();
            continue;
        }
        /**  Step03 if user leave over 3 min */
        const user = users[0];
        const nowSec = Date.now();
        if(Math.abs(user.timestamp - nowSec) > 1000 * 60 * config.maxLeave) {
            await bot.replyMessage(
                event.replyToken,
                createMenuMessage(`哈囉，你離開超過${config.maxLeave}分鐘了，讓我們重新開始吧，試試下面的選項`)
            );
            user.timestamp = Date.now();
            user.state = "INIT";
            await user.save();
            continue;
        }
        /** Step04: State Transition */
        const nextState = await nfa.transition(user.state, event.message.text, event.replyToken);
        user.state = nextState;
        user.time = Date.now();
        await user.save();
    }
    return res.status(200).json();
});

https
    .createServer(
        {
            key: fs.readFileSync("./key.pem"),
            cert: fs.readFileSync("./cert.pem")
        },
        app
    )
    .listen(4000, async () => {
        try {
            await mongoose.connect("mongodb://localhost:5000/chat");
            console.log("Server Setup at 4000");
        }catch(err) {
            console.log("Error Happend When Connect to DB, Please Close App.")
        }
    });
