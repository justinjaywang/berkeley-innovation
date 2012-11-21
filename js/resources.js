$(document).ready(function(){
  $.getJSON('https://api-ssl.bitly.com/v3/user/link_history?access_token=05a8ff99765bdf9f5bd14d5cfcee8be033eeca39&callback=?', function(data){
  	
  	$.each(data, function(key, item){
      if (key=="data") {
        $.each(item.link_history, function(i, link_obj){
          // console.log(link_obj)
          //           console.log(link_obj.title)
          //           console.log(link_obj.long_url)
          $('.bitly').prepend('<div class="four columns"><h3 class="resource"><a href="' + link_obj.long_url + '">' + link_obj.title + '</a></h3></div');
        });
      };
		});
		
  });
});