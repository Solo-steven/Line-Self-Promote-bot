const bot = require('../bot');
const { createTextMessage, createButtonMessage } = require('../messages');

const state = "SKILL";
const transition = async (message, token) => {
   switch(message) {
        case "Currently learning":
            await bot.replyMessage(
                token, 
                [
                    createTextMessage(
                        "我最近在學 golang 跟瀏覽器的基本 render 原理，像是 CRP\
                         也試著熟悉使用分析瀏覽器效能的工具， 像是 Chorm 的 Performance Tab 跟 React 的 Profiler"
                    ),
                ]
            );
            return "INIT";
        case "Back": 
            await bot.replyMessage(
                token,
                [
                    createTextMessage("好XD，我還有一些事情可以分享，你要不要看看呢?"),
                    createButtonMessage([
                        { label: "過去的經驗", text: "Experience" },
                        { label: "目前的學歷", text: "Education" }
                    ])
                ]
            );
            return "INIT";
        default:
            await bot.replyMessage(
                token,
                [
                    createTextMessage("抱歉XD，你打這個機器人聽不懂啦QQ，試試看選下面的選項"),
                    createButtonMessage([
                        { label: "那你最近在學什麼？", text: "Currently learning"},
                        { label: "無聊，說說其他的", text: "Back"},
                    ])
                ]
            )
            return state;
   } 
} ;

module.exports = {
    state,
    transition,
};