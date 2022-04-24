const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bot = require('./bot.js');
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
        /** Step02: Get State */
        const users = await userModel.find({ id: event.source.userId });
        if(users.length === 0) {
            console.log(`New User ${event.source.userId} is coming.`);
            const user = new userModel();
            user.id = event.source.userId;
            user.state = "INIT";
            await bot.replyMessage(
                event.replyToken,
                createMenuMessage("哈囉，我是來自成功資工三年級的李廷偉，想更認識我的話，可以點一下下面的選項喔！！")
            );
            await user.save();
            continue;
        }
        const user = users[0];
        /** Step03: State Transition */
        const nextState = await nfa.transition(user.state, event.message.text, event.replyToken);
        user.state = nextState;
        await user.save();
    }
    return res.status(200).json();
});

app.listen(4000, async () => {
    try {
        await mongoose.connect("mongodb://localhost:5000/chat");
        console.log("Server Setup at 4000");
    }catch(err) {
        console.log("Error Happend When Connect to DB, Please Close App.")
    }
});
