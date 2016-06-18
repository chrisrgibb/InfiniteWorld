define(function(require){


	/** @type {optionsManager} */
	var optionsManager = null;

	var noop = function () {};

	var listeners = [
		{
			id : 'range',
			event : 'change',
			fn : function () {
				optionsManager.update('randomSeed', this.value);
				// localStorage['infinite.alexkidd.randomSeed'] = this.value;		
				document.getElementById('randomSeed').value = this.value;

				var opss = optionsManager.getMany(['randomSeed', 'generateRandomLevel', 'direction']);

				Game.init({
					isRandom : opss.generateRandomLevel,
					seedValue : opss.randomSeed
				});
			},
			init : noop
		},
		{
			id : 'start-button',
			event : 'click',
			fn : function () {
				Game.startGame();
			},
			init : noop
		},
		{
			id : 'checkbox-isRandom',
			event : 'change',
			fn : function () {
				var generateRandom = this.checked;
				optionsManager.update('generateRandomLevel', generateRandom);
			},
			init : function () {
				document.getElementById(this.id).checked = optionsManager.get('generateRandomLevel');
			}
		},
		{
			id : 'randomSeed',
			event : 'change',
			fn : function() {
				optionsManager.update('randomSeed', this.value);
				Game.init();
			},
			init : function () {
				document.getElementById(this.id).value = optionsManager.get('randomSeed') || 0;
			}
		},
		{
			id : 'randomLevel',
			event : 'click',
			fn : function () {
				var randomNumber = Math.random() * 100000 | 0;
				document.getElementById('randomSeed').value = randomNumber;
				optionsManager.update('randomSeed', randomNumber);
				// localStorage['infinite.alexkidd.randomSeed'] = randomNumber;
				Game.init();
			},
			init : noop
		},
		{
			id : 'select-direction',
			event : 'click',
			fn : function () {
				var options = {};
				options.direction = this.value === "vertical" ? 1 : 0;
				optionsManager.update('direction', options.direction);
			},
			init : function () {
				document.getElementById(this.id).value = optionsManager.get('direction');
			}
		}
	];


    return  {
		/**
		 * STOP LYING!!!
		 * @param {optionsManager} optsman - the optionsManager
		 */
        init : function(optsman) {
			
			optionsManager = optsman;

			listeners.forEach(function (listener) {
				listener.init();
				var domElement = document.getElementById(listener.id);
				domElement.addEventListener(listener.event, listener.fn);
			});
        }
    };

});