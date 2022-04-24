const createTextMessage = (text) => {
    return {
        type: "text",
        text: text
    }
};

const createButtonMessage = (buttons) => {
    return {
        type: "flex",
        altText: "this is a flex message",
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: buttons.map(button => (
                    {
                        type: "button",
                        action: {
                            type: "message",
                            label: button.label,
                            text: button.text
                        },
                        margin: "8px"
                    }
                ))
            }
        }
    }
};

const createMenuMessage = (text) => {
    return [
        createTextMessage(text),
        createButtonMessage([
            { label: "擅長的技術",text: "Skill" },
            { label: "過去的經驗",text: "Experience" },
            { label: "目前的學歷",text: "Education" }
        ])
    ]
}

module.exports = {
    createButtonMessage,
    createTextMessage,
    createMenuMessage,
}