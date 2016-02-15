define(function(argument) {
	// body...

	this.sectionHelper = function(rand){
		this.createIndexs = function(length, minSize, maxSize, startAt){
			var index = startAt || 0;
			var sizes = [];
			while(index < length){
				var lastestSize = rand.nextInt(minSize, maxSize);
				
				if(lastestSize + index > length){
					lastestSize = length - index;
				}
				// x = index 
				// length = latestSize
				sizes.push({
					x : index,
					length : lastestSize
				});
				
				index += lastestSize;
				// sizes.push(index-1);
			}

			return sizes;
		};
	};


	return {

		/**
		*  takes a specified length and returns an array of random indexes
		**/
		SectionHelper : this.sectionHelper

	};

});