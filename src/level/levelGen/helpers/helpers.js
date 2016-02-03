define(function(argument) {
	// body...

	this.sectionHelper = function(rand){
		this.createIndexs = function(length, minSize, maxSize){
			var index = 0;
			var sizes = [];
			while(index < length){
				var lastestSize = rand.nextInt(minSize, maxSize);
				
				if(lastestSize + index > length){
					lastestSize = length - index;
				}
				
				index += lastestSize;
				sizes.push(index-1);
			}

			return sizes;
		}
	}


	return {

		/**
		*  takes a specified length and returns an array of random indexes
		**/
		SectionHelper : this.sectionHelper

	}

})