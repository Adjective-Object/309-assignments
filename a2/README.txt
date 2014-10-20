#Assignment 2: Breakout
c3huangk/g3gohnic

An implementation of Atari's "Breakout" implemented using Canvas, created for Assignment 2 of CSC309 Fall 2014.

AMI ID: <not yet created>  

Source File:

Apache Startup:
The apache server should be running by default. If not, run
`sudo apachectl start`

If for some reason the wrong assignment is being 
showed  on the server, run
`/home/ubuntu/309-assignments/a2/setupwww`
which should copy the relevant files to the apache www/html folder.

Target Browser: Google Chrome - untested for Mozilla Firefox.

##Documentation

The HTML front end of the project - stored in `index.html` - is a simple initialization of a canvas element with id `game` as well as various control constants that we pass to the engine scripts.

In terms of class organization, our implementation features two important classes: `Player` and `Ball` - stored in `elem.js`-  both inheriting from a parent `elem` class - stored in `gameobject.js`. Each class contains respective properties that are relevant to its uses, for example x/y coordinates, size, velocity and others. 

In addition each class has its own respective `update` function that is run constantly on a timer based on `t_step` intervals. These `update` functions are essentially constant checks that are run for various game elements. For example, `ball.prototype.update` constantly checks the position of the ball, and reacts accordingly to various cases such as ball loss.

Inputs are controlled separately in `input.js` and are triggered by detection of either keypress or keyhold events. These event triggers are separete from the timer ticks of the update function and stored internally until the next call of `input.update()`. This is to synchronize button presses to the update loop of the game logic.

Start, game, next level and game over are all controlled using a state system that is outlined in `game.js`. Essentially, if the game has detected during any of the update sequences, that any of the conditions have been met for the game to proceed to a different state. If at any point in time, conditions are met during an update loop, one of the appropriate functions are called and appropriate actions are taken. For example, if a player loses a life in the game, their `lives` count is reduced by one, and if this brings them to 0, the  `gameLose()` function is called. If at any time, a player destroys a block, `checkWinState()` is called to perform checks if a win state is present, and if it is succesful, changes `nextstate` to the win state, and indicates that a state change must occur by modifying the `statechangehandled` variable.