function ShapeManager(){


}

var Utils = {
	addToArray :function(array, item){
		for (var i = 0; i < array.length; i++){
			if(array[i][0] == item[0] && array[i][1] == item[1] ){
				return false;
			}
		}
		array.push(item);
		return true;
	}
}