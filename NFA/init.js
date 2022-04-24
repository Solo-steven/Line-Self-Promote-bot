const bot = require('../bot');
const { createMenuMessage, createTextMessage, createButtonMessage } = require('../messages');

const state = "INIT";
const transition = async (message, token) => {
   switch(message) {
        case "Skill":
            await bot.replyMessage(
                token,
                [
                    createTextMessage("Hi 我擅長前端工程的技術，除了基本的 JS CSS HTML 之外，我更擅長用 React 生態系的工具寫出 Web App"),
                    createButtonMessage([
                        { label: "那你最近在學什麼？", text: "Currently learning"},
                        { label: "無聊，說說其他的", text: "Back"},
                    ])
                ]
            );
            return "SKILL";
        case "Experience": 
            await bot.replyMessage(
                token,
                [
                    createTextMessage("我在學校中有加入教授的產品團隊寫過 UI ，也加入學生的團隊中一起開發著產品"),
                    createButtonMessage([
                        { label: "你在教授的團隊做什麼的", text: "School Project"},
                        { label: "你在學生團隊是做什麼的", text: "Student Project"},
                        { label: "好..，說說其他得", text: "Back"},
                    ])
                ]
            );
            return "EXPERIENCE";
        case "Education":
            await bot.replyMessage(
                token,
                [
                    createTextMessage("Education"),
                    createButtonMessage([
                        { label: "沒在履歷上的小秘密", text: "Education secrets"},
                        { label: "ㄣ，有其他的嗎？", text: "Back"},
                    ])
                ]
            );
            return "EDUCATION";
        default:
           await bot.replyMessage(
               token,
               createMenuMessage("抱歉，這個機器人還笨笨的不太會聊天，請你選下面的選項喔！！")
            );
           return "INIT";
   } 
};

module.exports = {
    state,
    transition,
};