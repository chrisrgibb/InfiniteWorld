define(['../game/objects/gameobject'],function(GameObject){

	function Animation(){
		// TODO does nothing right now

	}

	Animation.prototype = new GameObject();
	
	return Animation;
});