
// dependent on jquery being loaded

$(function(){

	function parseBlock(block){
		console.log('parseBlock() = '+ block.tag);
		var tag = block.tag;
	
		if(tag === 'hr'){
			// $('#page-content').append("<div class="+block.tag+"></div>");
			$('#page-content').append("<"+block.tag+">");
		}
		if(tag === 'h1' || tag === 'h2' || tag === 'p'){
			// $('#page-content').append("<div class="+block.tag+">"+block.content+"</div>");
			$('#page-content').append("<"+block.tag+">"+block.content+"</"+block.tag+">");
		}

	}	

	function parseComments(comment){
		var commentHtml = "<div class='comment'>"+
								"<div class='title'>"+comment.title+"</div>"+
								"<div class='content'>"+comment.content+"</div>"+
							"</div>";
		$('#comments-content').append(commentHtml);
	}
				
	$.getJSON('/api/pages/1/comments', function(data){
		console.log(data);
		for (var i = 0; i < data.length; i++) {
			parseComments(data[i]);
		};
	});

	$.getJSON('/api/pages/1/blocks', function(data){
		console.log(data);
		for (var i = 0; i < data.length; i++) {
			parseBlock(data	[i]);
		};			
	});
		

});
