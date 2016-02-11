define(['../settings/odds'],function(OddsHelper){

			

	return {
		/*
		* Creates a ledge with 
		* @param context the generated level context
		* context has these propertys : 
			randomNumber generator
			minimum height 
			minimum length?


			possible generated ledge sizes  :  4 * 2, 5 * 2, 5 * 1, 2 * 1, 3 * 1, 4 * 1
			
		*/
		create : function(context, config){
			var odds = new OddsHelper({
				"left" : 4,
				"right" : 4,
				"middle" : 2
			}, context.rand);

			var x = context.rand.nextBool() % 2 == 0 ? 0 : 8;	
			var ledge = {
				x : x,
				y : -1,
				width : context.rand.nextInt(5, 8),
				height : 1
			};

			var side = odds.next();	

			var mapWidth = context.mapWidth;
			if(side === "left"){
				ledge.x = 0;
			}
			if( side === "right"){
				ledge.x = mapWidth - ledge.width;
			}
			if(side === "middle"){
				ledge.x = Math.floor(mapWidth / 2) - (Math.floor(ledge.width / 2)); 
			}

			return ledge;
		}
	}


});