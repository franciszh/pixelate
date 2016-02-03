
var image_uploader = (function(){

	var bind = function(callback){
		
		//Bind upload button event
		document.getElementById('image_uploader').addEventListener('change',function(){
			if (this.files && this.files[0]) {
				readfile(this.files[0],callback);
			}	
		});
		
		//Bind HTML 5 Drag and Drop
		if('draggable' in document.createElement('span')){
			var dropArea = document.getElementById('wrap');
			  dropArea.ondragover = function () { this.className = 'hover'; return false; };
			  dropArea.ondragleave = function () { this.className = ''; return false; };
			  dropArea.ondrop = function (e) {
					this.className = '';
					e.preventDefault();
					readfile(e.dataTransfer.files[0],callback);
			};
		}
	};
	
	var readfile = function(file,callback){
		if(/image/.test(file.type)){
			var reader = new FileReader();
			reader.onload = function(e){
				var imageObj = new Image();
				imageObj.onload = function(){
					callback(this,file.name);
				};
				imageObj.src = e.target.result;
			}
			reader.readAsDataURL(file);
		}
	
	};
	
	return {
		bind : bind
	};

})();
