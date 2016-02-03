
var pixel_lt = (function(debug,maxWorkers,pixal_in_block,index,start){

	var image,c,h_w,ver_blocks,hor_blocks,total_blocks,ctx,pixel_group;

	var drawImageToCanvas = function(imgEl,canvEl,image_h_w){
		var context = canvEl.getContext && canvEl.getContext('2d');
		canvEl.height = image_h_w.height;
		canvEl.width = image_h_w.width;
		context.drawImage(imgEl,0,0);
		return context;
	};
	
	var	getHeightWidth = function(imgEl){
		 var height =  imgEl.offsetHeight  || imgEl.offsetHeight || imgEl.height;
		 var width =  imgEl.offsetWidth || imgEl.naturalWidth || imgEl.width;
		 return {'height':height,'width':width};
	};
	
	var runWorker = function(worker,pixels,v_b,h_b,h_w,t_b,context) {
			var imgData = null;
			var curX = 0;
			var curY = 0;
			var xLen = 0;
			var yLen = 0;
			
			curX = index % h_b;
			curY = Math.floor( index / h_b );
			xLen = yLen = pixels;
			if((curX + 1) * pixels > h_w.width && curX * pixels < h_w.width){
					xLen = h_w.width - curX * pixels;
			}
			if((curY + 1) * pixels > h_w.height && curY * pixels < h_w.height){
					yLen = h_w.height - curY * pixels;
			}
			
			imgData = context.getImageData(curX*pixels,curY*pixels,xLen,yLen);
			
			worker.onmessage = function(event) {
				var data = event.data;
                //debug.appendChild(document.createTextNode('worker.onmessage i = ' + data.index + '\n'));
				
				context.putImageData(data.imgData,data.curX*pixels,data.curY*pixels);
                if (data.index < t_b) runWorker(worker,pixels,v_b,h_b,h_w,t_b,context);
                else {
                    if(--maxWorkers === 0) //alert((new Date).getTime() - start);
                    worker.terminate();
                }
            };
            worker.postMessage({imgData:imgData,curX:curX,curY:curY,index:index++}); // start the worker.

     };
	 
	 var runWorker_specifyArea = function(worker,pixels,context){
	 		var imgData = null;
			var curX = 0;
			var curY = 0;
			var xLen = 0;
			var yLen = 0;
			var DomSize = pixels.length;
			if(DomSize>0){
				curX = parseInt(pixels[0].attributes['x'].value);
				curY = parseInt(pixels[0].attributes['y'].value);
				xLen = parseInt(pixels[0].attributes['xlen'].value);
				yLen = parseInt(pixels[0].attributes['ylen'].value);
				pixels[0].remove();
				
			imgData = context.getImageData(curX*xLen,curY*yLen,xLen,yLen);
			
			worker.onmessage = function(event) {
				var data = event.data;
                //debug.appendChild(document.createTextNode('worker.onmessage i = ' + data.index + '\n'));
				
				context.putImageData(data.imgData,data.curX*data.xLen,data.curY*data.yLen);
                if (DomSize > 0) {
				runWorker_specifyArea(worker,pixels,context);
				
				}else {
                    if(--maxWorkers === 0) //alert((new Date).getTime() - start);
                    worker.terminate();
                }
            };
			worker.postMessage({imgData:imgData,curX:curX,curY:curY,xLen:xLen,yLen:yLen});
			}
	 };
	 
	 
	 var drawcanvas = function(image){
			c = document.getElementById("canvas");
			h_w = getHeightWidth(image);
			ctx = drawImageToCanvas(image,c,h_w);
	 };
	 
	 var init = function(){
			pixel_group = document.getElementsByClassName("active")
			ver_blocks = Math.ceil(h_w.height/pixal_in_block);
			hor_blocks = Math.ceil(h_w.width/pixal_in_block);
			total_blocks = ver_blocks*hor_blocks;
			
			if(pixel_group.length>0){
				total_blocks = pixel_group.length;
			}
	 };
	 
	 var run = function(){
			if(document.getElementById('grid')) document.getElementById('grid').style.display = "none";
			if(pixel_group.length>0){
				for(var i = 0; i < maxWorkers; i++){
					runWorker_specifyArea(new Worker('js/colorCaculator.js'),pixel_group,ctx);
				} 
			}else{
				for(var i = 0; i < maxWorkers; i++){
					runWorker(new Worker('js/colorCaculator.js'),pixal_in_block,ver_blocks,hor_blocks,h_w,total_blocks,ctx);
				} 
			}
			

	 };
	 
	 return {
		drawcanvas : drawcanvas,
		init : init,
		run : run
	 };

})(debug,maxWorkers,pixal_in_block,index,start);