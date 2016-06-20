/**
* The UI for the game
*/
define(function(require, exports, module) {

    var handlers = require('./eventhandlers');
    var controlPanel = require('./controlPanel');
    var Game = require('../game/Game');
    var Debugger = require('../extras/debugger');
    var optionsManager = require('../level/levelgen/useroptions');


    var userDefinedOptions = {
        direction : 1,
        seedValue : parseInt(localStorage['infinite.alexkidd.randomSeed']) || 6,
        isRandom : localStorage['infinite.alexkidd.generateRandomLevel'] === "true",
        isBozo : true
    };

    
    // 
    // Seed int  range slider and number input
    // horizontal or vertical boolean
    // generate random level
    module.exports = {
        /** 
         *  Sets up the eventhandlers and starts the Game
        */
        init : function () {
            window.debug = new Debugger();
		    window.Game = Game;
            
            handlers.init(optionsManager);

            Game.startGame(userDefinedOptions);
        }
    };
});