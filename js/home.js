$(window).load(function() {
  $('#featured').orbit();
});

$(document).ready(function(){
  
  function relative_time(time_value) {
	  var values = time_value.split(" ");
	  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
	  var parsed_date = Date.parse(time_value);
	  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	  delta = delta + (relative_to.getTimezoneOffset() * 60);

	  var r = '';
	  if (delta < 60) {
		r = '1 minute ago';
	  } else if(delta < 120) {
		r = '2 minutes ago';
	  } else if(delta < (45*60)) {
		r = (parseInt(delta / 60)).toString() + ' minutes ago';
	  } else if(delta < (90*60)) {
		r = '1 hour ago';
	  } else if(delta < (24*60*60)) {
		r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';
	  } else if(delta < (48*60*60)) {
		r = '1 day ago';
	  } else {
		r = (parseInt(delta / 86400)).toString() + ' days ago';
	  }

	  return r;
	}

	String.prototype.linkify = function() {
		return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(m) {
			return m.link(m);
		});
	};
	
	$.getJSON('https://api.twitter.com/1/statuses/user_timeline.json?include_rts=true&screen_name=binnov&count=3&callback=?', function(data){
		$.each(data, function(index, item){
		  $('.twitter').append('<div class="tweet"><span class="tweet-handle"></span><p class="tweet-words">' + item.text.linkify() + '</p><p class="tweet-time">' + relative_time(item.created_at) + '</p></div>');
		});
	});
	
	$.getJSON("http://api.flickr.com/services/feeds/groups_pool.gne?id=52682713@N00&lang=en-us&format=json&jsoncallback=?", function(data){
    $.each(data.items, function(index, item){
      if (index == 6) return false;
    	$('<img/>').attr({'src':item.media.m.replace('_m', '_q'), 'class': 'test'}).appendTo('.flickr').wrap('<a href="' + item.link + '"></a>').wrap('<div class="four-thirds column"></div>');
    });
  });
  
});