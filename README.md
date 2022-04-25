## Info of this bot

- Basic ID: @012rdoow
- QRCode:

![](./asset/qrcode.png)]

## Feature of this bot

The main and only feature of this bot is that this bot is based on NFA. First I consider chat is some kind of state change.
And Each time change is only affected by current state and input text. So Assume above, I create a class to hold state info and
provider a match-action interface to register state into a state machine.

The benefit of this pattern is that pure function is easy to de-bug, as long as function logic is correct, the output is easy to predict by input.
