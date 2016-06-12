define(['./eventhandlers', './controlpanel', '../game/Game', '../extras/debugger'],function(handlers, controlPanel, Game, Debugger){
    /**
    * A module representing a shirt.
    * @exports my/shirt
    */
    
    // 
    // Seed int  range slider and number input
    // horizontal or vertical boolean
    // generate random level
    /**
     * DO SOM THISE
     */
    return {
        /** 
         *  Sets up the eventhandlers and starts the Game
         *  
        */
        init : function () {
            window.debug = new Debugger();
		    window.Game = Game;
            
            handlers.init();

            Game.startGame();
        }
    };

});