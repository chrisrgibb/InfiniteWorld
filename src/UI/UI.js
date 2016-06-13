/**
* The UI for the game
*/
define(function(require) {

    var handlers = require('./eventhandlers');
    var controlPanel = require('./controlPanel');
    var Game = require('../game/Game');
    var Debugger = require('../extras/debugger');

    
    // 
    // Seed int  range slider and number input
    // horizontal or vertical boolean
    // generate random level
    return {
        /** 
         *  Sets up the eventhandlers and starts the Game
        */
        init : function () {
            window.debug = new Debugger();
		    window.Game = Game;
            
            handlers.init();

            Game.startGame();
        }
    };
});