const { createTextMessage, createButtonMessage, createMenuMessage } = require('../messages');

const states = {
    init: "INIT",
    skill: "SKILL",
    education: "EDUCATION",
    experience: "EXPERIENCE",
    schoolProject: "SCHOOL_PROJECT",
    studentProject: "STUDENT_PROJECT",
    aboutBot: "ABOUT_BOT",
};

const init = {
    state: states.init,
    array: [
        { 
            match: "Skill", 
            action: [
                    createTextMessage("Hi 我擅長前端工程的技術，除了基本的 JS CSS HTML 之外，我更擅長用 React 生態系的工具寫出 Web App"),
                    createButtonMessage([
                        { label: "那你最近在學什麼？", text: "Currently learning"},
                        { label: "無聊，說說其他的", text: "Back"},
                    ])
            ],
            next: states.skill
        },
        {
            match: "Education",
            action: [
                createTextMessage("嗨嗨，我現在就讀的大學是成功大學，是一個從資管系轉到資工系的人，就是同學口中的混血仔，抱著寫程式很好玩的心態而上了這條船(?"),
                createButtonMessage([
                    { label: "沒在履歷上的小秘密", text: "Education secrets"},
                    { label: "好ㄛ，有其他的嗎？", text: "Back"},
                ])
            ],
            next: states.education
        },
        {
            match: "Experience",
            action: [
                createTextMessage("我在學校中有加入教授的產品團隊寫過 UI ，也加入學生的團隊中一起開發著產品"),
                createButtonMessage([
                    { label: "你在教授的團隊做什麼的", text: "School Project"},
                    { label: "你在學生團隊是做什麼的", text: "Student Project"},
                    { label: "好..，說說其他ㄉ", text: "Back"},
                ])
            ],
            next: states.experience
        },
        {
            match: "",
            action: [
                createTextMessage("抱歉XD，你打這個機器人聽不懂啦QQ，試試看選下面的選項"),
                createButtonMessage([
                    { label: "那你最近在學什麼？", text: "Currently learning"},
                    { label: "無聊，說說其他的", text: "Back"},
                ])
            ],
            next: states.init
        },
    ]
};

const skill = {
    state: states.skill,
    array: [
        { 
            match: "Currently learning", 
            action: [
                    createTextMessage(
                        "我最近在學 golang 跟瀏覽器的基本 render 原理，像是 CRP\
                        也試著熟悉使用分析瀏覽器效能的工具， 像是 Chorm 的 Performance Tab 跟 React 的 Profiler"
                    ),
                    createTextMessage("大概就這樣了，要不要看看其他的？"),
                    createButtonMessage([
                        { label: "過去的經驗", text: "Experience" },
                        { label: "目前的學歷", text: "Education" }
                    ])
            ], 
            next: states.skill
        },
        {
            match: "Back",
            action: [
                    createTextMessage("好XD，我還有一些事情可以分享，你要不要看看呢?"),
                    createButtonMessage([
                        { label: "過去的經驗", text: "Experience" },
                        { label: "目前的學歷", text: "Education" }
                    ])
            ],
            next: states.init
        },
        {
            match: "",
            action: [
                createTextMessage("抱歉XD，你打這個機器人聽不懂啦QQ，試試看選下面的選項"),
                createButtonMessage([
                    { label: "那你最近在學什麼？", text: "Currently learning"},
                    { label: "無聊，說說其他的", text: "Back"},
                ])
            ],
            next: states.skill
        },
    ]
};

const education = {
    state: states.education,
    array: [
        {
            match: "Education secrets",
            action: [
                createTextMessage("其實我在政大讀過幾個月的『歷史系』XD，這個我可沒有寫在履歷上ㄛ，所以其實我讀過兩個學校，三個不同的系！！(是不是很爛的秘密~)"),
                createTextMessage("好拉，沒其他關於學歷方面好說了，你可以再看看這些"),
                createButtonMessage([
                    { label: "擅長的技術",text: "Skill" },
                    { label: "過去的經驗",text: "Experience" },
                ])  
            ],
            next: states.init
        },
        {
            match: "Back",
            action: [
                createTextMessage("好XD，我還有一些事情可以分享，你要不要看看呢?"),
                createButtonMessage([
                    { label: "擅長的技術",text: "Skill" },
                    { label: "過去的經驗",text: "Experience" },
                ])
            ],
            next: states.init
        },
        {
            match: "",
            action: [
                createTextMessage("抱歉XD，你打這個機器人聽不懂啦QQ，試試看選下面的選項"),
                createButtonMessage([
                    { label: "你在教授的團隊做什麼的", text: "School Project"},
                    { label: "你在學生團隊是做什麼的", text: "Student Project"},
                    { label: "好..，說說其他得", text: "Back"},
                ])
            ],
            next: states.education
        }
    ]
};


const experience = {
    state: states.experience,
    array: [
        {
            match: "School Project",
            action: [

            ],
            next: states.schoolProject
        },
        {
            match: "Student Project",
            action: [

            ],
            next: states.studentProject,
        },
        {
            match: "Back",
            action: [
                createTextMessage("好XD，我還有一些事情可以分享，你要不要看看呢?"),
                createButtonMessage([
                    { label: "擅長的技術",text: "Skill" },
                    { label: "目前的學歷", text: "Education" }
                ])       
            ],
            next: states.init
        },
        {
            match: "",
            action: [
                createTextMessage("抱歉XD，你打這個機器人聽不懂啦QQ，試試看選下面的選項"),
                createButtonMessage([
                    { label: "你在教授的團隊做什麼的", text: "School Project"},
                    { label: "你在學生團隊是做什麼的", text: "Student Project"},
                    { label: "好..，說說其他得", text: "Back"},
                ])        
            ],
            next: states.experience
        }
    ]
}

const studentProject = {
    state: states.studentProject,
    array: [
        {
            match: "Back",
            action: [  
            ],
            next: states.studentProject,
        },
        {
            match: "",
            action: [
            ],
            next: states.studentProject
        }
    ]
}

const schoolProject = {
    state: states.schoolProject,
    array: [
        {
            match: "Back",
            action: [  
            ],
            next: states.schoolProject,
        },
        {
            match: "",
            action: [
            ],
            next: states.schoolProject
        }
    ]
}


module.exports = [
    init, 
    skill,
    education,
    experience,
    schoolProject,
    studentProject
];