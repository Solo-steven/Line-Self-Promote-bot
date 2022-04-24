const bot = require('../bot');
const { createTextMessage, createButtonMessage } = require('../messages');

const state = "EXPERIENCE";
const transition = async (message, token) => {
    switch(message) {
        case "School Project":
            break;
        case "Student Project":
            break;
        case "Back":
            await bot.replyMessage(
                token,
                [
                    createTextMessage("好XD，我還有一些事情可以分享，你要不要看看呢?"),
                    createButtonMessage([
                        { label: "擅長的技術",text: "Skill" },
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
                        { label: "你在教授的團隊做什麼的", text: "School Project"},
                        { label: "你在學生團隊是做什麼的", text: "Student Project"},
                        { label: "好..，說說其他得", text: "Back"},
                    ])
                ]
            )
            return state;
    }
} ;

module.exports = { 
    state,
    transition
}