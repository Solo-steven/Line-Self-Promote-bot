const init = require('./init.js');
const skill = require('./skill.js');
const experience = require('./experience.js');
const education = require('./education.js');

class NFA  {
    constructor() {
        this.transitionGraph = {}
        this.logger = true;
    }
    register(state, transition) {
        this.transitionGraph[state] = transition ;
    }
    async transition(currentState, message, token) {
        const nextState = await this.transitionGraph[currentState](message, token);
        if(this.logger) {
            console.log(`FROM ${currentState} to ${nextState} by message ${message}`)
        }
        return nextState;
    }
}

const nfa = new NFA();
nfa.register(init.state, init.transition);
nfa.register(skill.state, skill.transition);
nfa.register(experience.state, experience.transition);
nfa.register(education.state, education.transition);

module.exports = nfa;
