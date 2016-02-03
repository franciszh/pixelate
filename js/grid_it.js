
var grid_it = (function(){
	var h_w,ver_blocks,hor_blocks,total_blocks;
	var table_head = '<table id = "grid">',table_tail = '</table>',table_body;
	
	
	var	getHeightWidth = function(imgEl){
		 var height = imgEl.offsetHeight  || imgEl.offsetHeight || imgEl.height;
		 var width = imgEl.offsetWidth || imgEl.naturalWidth || imgEl.width;
		 return {'height':height,'width':width};
	};
	
	var init = function(){
		var image = document.getElementById('canvas');
		h_w = getHeightWidth(image);
		ver_blocks = Math.ceil(h_w.height/pixal_in_block);
		hor_blocks = Math.ceil(h_w.width/pixal_in_block);
		total_blocks = ver_blocks*hor_blocks;
	};
	
	var removeGrid = function(){
	
		document.getElementById('grid') && document.getElementById('wrap').removeChild(document.getElementById('grid'));
	};
	
	var run = function(){
		var xLen = yLen = pixal_in_block;
		var down = false;
		table_body = '';
		removeGrid();
		for(i = 0 ; i < ver_blocks ; i++){
			table_body += '<div class = "row">';
			for( j = 0 ; j< hor_blocks ; j++){
				xLen = yLen = pixal_in_block;
				
				if((j + 1) * pixal_in_block > h_w.width && j * pixal_in_block < h_w.width){
						xLen = h_w.width - j * pixal_in_block;
				}
				if((i + 1) * pixal_in_block > h_w.height && i * pixal_in_block < h_w.height){
						yLen = h_w.height - i * pixal_in_block;
				}
				table_body += '<div class = "cell" x = "'+j+'" y = "'+i+'" xlen = "'+xLen+'" ylen = "'+yLen+'" style = "height:'+yLen+'px; width:'+xLen+'px; box-sizing : border-box;"></div>';
			}
			table_body += '</div>';
		}
		
		var table = document.createElement('div');
		table.id = 'grid';
		table.border = '0';
		table.innerHTML = table_body;
		document.getElementById('wrap').appendChild(table);
		
		$(table).on('click',function(e){
			e.preventDefault();
			if($(e.target).prop('id')!='grid'){
				$(e.target).toggleClass('active');
			}
		});
		
		$(table).on('mouseover',function(e){
			if(down && $(e.target).prop('id')!='grid') {
				$(e.target).addClass('active');
			}
		});
		
		$(document).mousedown(function() {
			down = true;
		}).mouseup(function() {
			down = false;  
		});
	
	};
	
	return {
		init : init,
		run : run
	};

})();
