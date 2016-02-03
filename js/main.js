
//Controller
window.onload = function() {
	image_uploader.bind(function(self,oldname){
		var newName = makeNewImgName(oldname);
		pixel_lt.drawcanvas(self);
		
		//Events
			document.getElementById('pixel_trigger').addEventListener('click',function(){
				pixel_lt.init();
				pixel_lt.run();
			})

			document.getElementById('grid_trigger').addEventListener('click',function(){
				grid_it.init();
				grid_it.run();
			})
			document.getElementById('btn_download').addEventListener('click', function () {
				this.href = document.getElementById('canvas').toDataURL();
				this.download = newName;
			});
	});
}





var makeNewImgName = function(oldname){
	var ext = oldname.substr(oldname.lastIndexOf('.'));
	var fileName = oldname.substr(0,oldname.lastIndexOf('.'));
	return fileName+'_'+Date.now().toString()+ext;
};