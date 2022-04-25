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
            match: "About this bot",
            action: [
                createTextMessage("如果你剛剛看完其他這個 bot 的選項，你會發現這個 bot 其實很簡單XD，沒什麼特別的，甚至可以說是無聊。那讓我來說說這個 bot 到底有什麼不一樣的吧！！"),
                createTextMessage("首先，我將回訊息的行為看成一個『 state machine 』，並創造一個 『 NFA 』 的 class 處理。"),
                createTextMessage("並且我創造一個 match-action 的 interface 去處理，在當前 state 遇到 text 後要進行的事情。"),
                createButtonMessage([
                    { label: "NFA 是什麼", text: "What is NFA" },
                    { label: "你實作 NFA 的方法", text: "What is your pattern" },
                ])
            ],
            next: states.aboutBot
        },
        {
            match: "",
            action: createMenuMessage("抱歉XD，你打這個機器人聽不懂啦QQ，試試看選下面的選項"),
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
                    createTextMessage("我最近在學 golang 跟瀏覽器的基本 render 原理，像是 CRP。也試著熟悉使用分析瀏覽器效能的工具， 像是 Chorm 的 Performance Tab 跟 React 的 Profiler"
                    ),
                    createTextMessage("大概就這樣了，要不要看看其他的？"),
                    createButtonMessage([
                        { label: "過去的經驗", text: "Experience" },
                        { label: "目前的學歷", text: "Education" },
                        { label: "這個 bot 有什麼特別", text: "About this bot" }
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
                        { label: "目前的學歷", text: "Education" },
                        { label: "這個 bot 有什麼特別", text: "About this bot" }
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
                    { label: "這個 bot 有什麼特別", text: "About this bot" }
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
                    { label: "這個 bot 有什麼特別", text: "About this bot" }
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
                createTextMessage("我在成大李信杰教授的軟體 - SideeX 當任工讀生，開發了一個可以連結 Github 和 GitLab 同步 script 的功能。"),
                createButtonMessage([
                    { label: "開發中學到什麼", text: "What you learned"},
                    { label: "開發中遇到最大的問題是什麼", text: "What is the biggest problem you met when you develop this feature?"},
                ])
            ],
            next: states.schoolProject
        },
        {
            match: "Student Project",
            action: [
                createTextMessage("我在"),
                createButtonMessage([
                    { label: "你擔任的角色是什麼", text: "What is your position?"},
                    { label: "對你的收獲是什麼？？", text: "What is benifit for you?" }
                ])

            ],
            next: states.studentProject,
        },
        {
            match: "Back",
            action: [
                createTextMessage("好XD，我還有一些事情可以分享，你要不要看看呢?"),
                createButtonMessage([
                    { label: "擅長的技術",text: "Skill" },
                    { label: "目前的學歷", text: "Education" },
                    { label: "這個 bot 有什麼特別", text: "About this bot" }
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

const schoolProject = {
    state: states.schoolProject,
    array: [
        {
            match: "What you learned",
            action: [
                createTextMessage("在開發中，我從 0 開始自學 react 和 redux ，並在四個月內成功開發出新功能，同時看完 SideeX UI 上千行的程式，為我在 react 生態開發 Web App 打下一些基礎XD。"),
                createTextMessage("最重要的應該是我在學習 redux 途中接觸了 FP 的概念，讓我對寫出更好的程式碼更有熱忱"),
                createButtonMessage([
                    { label: "開發中遇到最大的問題是什麼", text: "What is the biggest problem you met when you develop this feature?"},
                    { label: "朕知道了，其他的", text: "Back"},
                ])
            ],
            next: states.schoolProject
        },
        {
            match: "What is the biggest problem you met when you develop this feature?",
            action: [
                createTextMessage("當我在 SideeX 開發整合 Github 和 Gitlab 的功能時，我需要取得 使用者的 repo file tree 資料，但要打為必須要遞迴的呼叫 API call去尋訪 repo 檔案，造成很長的 loading time ( 6sec以上 )"),
                createTextMessage("一開始我嘗試用 GraphQL 去減少多次的API call 與不必要的 data 傳輸 ，的確有降低 API call 的次數和減少不必要的 data payload ，但loading time仍然很長 (3-4sec)"),
                createTextMessage("最後我將每一次使用者使用 select 變動時當前 path 時，再去取得下一次的資料，讓 api call 只在必須的時候呼叫。"),
                createButtonMessage([
                    { label: "開發中學到什麼", text: "What you learned"},
                    { label: "朕知道了，下去吧", text: "Back"},
                ])
            ],
            next: states.schoolProject
        },
        {
            match: "Back",
            action: [ 
                createTextMessage("領旨，以下恭請聖上御覽"),
                createButtonMessage([
                    { label: "你在學生團隊是做什麼的", text: "Student Project"},
                    { label: "好..，說說其他得", text: "Back"},
                ])
            ],
            next: states.experience,
        },
        {
            match: "",
            action: [
                createTextMessage("抱歉XD，你打這個機器人聽不懂啦QQ，試試問看下面關於我在學校專案 SideeX 的經歷吧！"),
                createButtonMessage([
                    { label: "開發中學到什麼", text: "What you learned"},
                    { label: "開發中遇到最大的問題是什麼", text: "What is the biggest problem you met when you develop this feature?"},
                ])
            ],
            next: states.schoolProject
        }
    ]
}

const studentProject = {
    state: states.studentProject,
    array: [
        {
            match: "What is your position?",
            action: [
                createTextMessage("Frontend Developer"),
                createButtonMessage([
                    { label: "對你的收獲是什麼？？", text: "What is benifit for you?" },
                    { label: "好，說說其他的吧", text: "Back" }
                ])
            ],
            next: states.studentProject
        },
        {
            match: "What is benifit for you?",
            action: [
                createTextMessage("讀書會"),
                createButtonMessage([
                    { label: "你擔任的角色是什麼", text: "What is your position?"},
                    { label: "好，說說其他的吧", text: "Back" }
                ])
            ],
            next: states.studentProject
        },
        {
            match: "Back",
            action: [  
                createTextMessage("好XD，我還有一些事情可以分享，你要不要看看呢?"),
                createButtonMessage([
                    { label: "擅長的技術",text: "Skill" },
                    { label: "過去的經驗",text: "Experience" },
                    { label: "目前的學歷",text: "Education" },
                    { label: "這個 bot 有什麼特別", text: "About this bot" }
                ])
            ],
            next: states.init,
        },
        {
            match: "",
            action: [
                createButtonMessage([
                    { label: "你擔任的角色是什麼", text: "What is your position?"},
                    { label: "對你的收獲是什麼？？", text: "What is benifit for you?" },
                    { label: "好，說說其他的吧", text: "Back" }
                ])
            ],
            next: states.studentProject
        }
    ]
};

const aboutBot =  {
    state: states.aboutBot,
    array: [
        {
            match: "What is NFA",
            action: [
                createTextMessage("NFA "),
                createButtonMessage([
                    { label: "然後呢？", text: "What is your pattern" },
                    { label: "好啦很簡單還說這麼久", text: "Back"},
                ])
            ],
            next: states.aboutBot,
        },
        {
            match: "What is your pattern",
            action: [
                createTextMessage("NFA "),
                createButtonMessage([
                    { label: "等等 NFA 是什麼", text: "What is NFA" },
                    { label: "好啦很簡單還說這麼久", text: "Back"},
                ])
            ],
            next: states.aboutBot
        },
        {
            match: "Back",
            action: [
                createTextMessage("你好聰明XD，還有這些東東你可以看看"),
                createButtonMessage([
                    { label: "擅長的技術",text: "Skill" },
                    { label: "過去的經驗",text: "Experience" },
                    { label: "目前的學歷",text: "Education" },
                ])
            ],
            next: states.init
        },
        {
            match: "",
            action: [
                createTextMessage("抱歉XD，你打這個機器人聽不懂啦QQ。我會嘗試講講下面兩個問題"),
                createButtonMessage([
                    { label: "NFA 是什麼", text: "What is NFA" },
                    { label: "你實作 NFA 的方法", text: "What is your pattern" },
                    { label: "好啦很簡單還說這麼久", text: "Back"},
                ])
            ],
            next: states.studentProject
        }
    ]
}


module.exports = [
    init, 
    skill,
    education,
    experience,
    schoolProject,
    studentProject,
    aboutBot
];