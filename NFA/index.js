const bot = require('../bot.js')
const config = require('./config.js');

class NFA  {
    constructor() {
        this.states = [];
        this.nextStateOfState = {};
        this.transitionGraph = {}
        this.logger = true;
        this.isCheck = false;
    }
    switchLogger() {
        this.logger = ! this.logger
    }
    addState(state, matchActionNextArray) {
        this.transitionGraph[state] =  async (message, token) => {
            const defaultTransition = matchActionNextArray[matchActionNextArray.length - 1];
            for(let i = 0 ; i < matchActionNextArray.length -1; ++i) {
                const item = matchActionNextArray[i];
                if(item.match === message) {
                    await bot.replyMessage(token, item.action)
                    return item.next;
                }
            }
            await bot.replyMessage(token, defaultTransition.action)
            return defaultTransition.next;
        }
        this.states.push(state)
        this.nextStateOfState[state] = matchActionNextArray.map(item => item.next);
    }
    check() {
        for(const state of this.states) {
            const next = this.nextStateOfState[state];
            for(const nextState of next) {
                if(this.states.indexOf(nextState) < 0) {
                    throw new Error(`Error When ${state} to ${nextState}, ${nextState} is Not Exist`);
                }
            }
        }
        this.isCheck = true;
    }
    async transition(currentState, message, token) {
        if(!this.isCheck) {
            throw  new Error("Not Check Yet!!, Please Run check function");
        }
        const nextState = await this.transitionGraph[currentState](message, token);
        if(this.logger) {
            console.log(`FROM ${currentState} to ${nextState} by message ${message}`)
        }
        return nextState;
    }
}

const nfa = new NFA();

for(const item of config) {
    nfa.addState(item.state, item.array);
}

nfa.check();

module.exports = nfa;
