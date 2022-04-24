const bot = require('../bot');
const { createTextMessage, createButtonMessage } = require('../messages');

const state = "EDUCATION";
const transition = async (message, token) =>{
    switch(message){
        case "Education secrets":
            await bot.replyMessage(
                token,
                [
                    createTextMessage("其實我在政大讀過幾個月的『歷史系』XD，這個我可沒有寫在履歷上ㄛ，所以其實我讀過兩個學校，三個不同的系！！(是不是很爛的秘密~)"),
                    createTextMessage("好拉，沒其他關於學歷方面好說了，你可以再看看這些"),
                    createButtonMessage([
                        { label: "擅長的技術",text: "Skill" },
                        { label: "過去的經驗",text: "Experience" },
                    ])
                ]
            )
            return "INIT";
        case "Back":
            await bot.replyMessage(
                token,
                [
                    createTextMessage("好XD，我還有一些事情可以分享，你要不要看看呢?"),
                    createButtonMessage([
                        { label: "擅長的技術",text: "Skill" },
                        { label: "過去的經驗",text: "Experience" },
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
    transition,
};
