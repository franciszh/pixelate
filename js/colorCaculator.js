self.onmessage = function(event) {
	var dataObject = event.data;
    var imageData = dataObject.imgData;
	var colorArray = imageData.data;
	var count = 0;
	var rgb = {r:0,g:0,b:0};
	if(colorArray.length > 0){
		for(i = 0, length = colorArray.length ; i < length ; i += 4 ){
			++count;
			rgb.r += colorArray[i];
			rgb.g += colorArray[i+1];
			rgb.b += colorArray[i+2];
		}
		rgb.r = ~~(rgb.r/count);
		rgb.g = ~~(rgb.g/count);
		rgb.b = ~~(rgb.b/count);
		
		for(i= 0, length = colorArray.length ; i < length ; i += 4 ){
			colorArray[i] = rgb.r;
			colorArray[i+1] = rgb.g;
			colorArray[i+2] = rgb.b;
		}
			
		imageData.data = colorArray;
		dataObject.data = imageData;
	}
    self.postMessage(dataObject);
};