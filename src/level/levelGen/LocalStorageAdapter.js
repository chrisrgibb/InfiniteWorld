define(function(){
	// whatever has been saved from the UI from last session
	var localStoragePrefix = 'infinite.alexkidd.';



	return {
		update : function(key, value){
			var localStorageKey = localStoragePrefix + key;
			// var item = 
			localStorage[localStorageKey] = value;
		},
		get : function(key){
			var localStorageKey = localStoragePrefix + key;
			var item = localStorage[localStorageKey];
			if(item != null){
				return item;
			} else {
				return "error could not find thingy";
			}
		}
	};

});