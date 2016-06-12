define(function(){

    return  {
        init : function() {

			document.getElementById('start-button').addEventListener('click', function(){
				// startGame();
				Game.startGame();
			});	

            var rangeSlider = document.getElementById('range');
			rangeSlider.addEventListener('change', function(){
				init(rangeSlider.value);
			});

			var checkbox = document.getElementById('checkbox-isRandom');
			checkbox.checked = localStorage['infinite.alexkidd.generateRandomLevel'] === "true";

			checkbox.addEventListener('change', function() {
				var generateRandom = this.checked;
				localStorage['infinite.alexkidd.generateRandomLevel'] = generateRandom;
			});

			var randomSeedValueBox = document.getElementById('randomSeed');
			randomSeedValueBox.value = parseInt(localStorage['infinite.alexkidd.randomSeed'] || 0);
			randomSeedValueBox.addEventListener('change', function() {
				localStorage['infinite.alexkidd.randomSeed'] = this.value;
				Game.init();
			});

			document.getElementById('randomLevel').addEventListener('click', function() {
				var randomNumber = Math.random() * 100000 | 0;
				randomSeedValueBox.value = randomNumber;
				localStorage['infinite.alexkidd.randomSeed'] = randomNumber;
				Game.init();
			});
        }
    };

});