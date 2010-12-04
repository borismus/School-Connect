(function() {
  
  // load fake JSON data
  var init = function() {
    // alert('calling updates.js init');
    // load the event data in JSON 
    $.getJSON('data/events.json', function(data) {
      var eventUpdates = data.data;
      // sort the data in recent first
      eventUpdates.sort(function(a, b) {
        return new Date(b.posted) - new Date(a.posted);
      });
      events = eventUpdates;
      // refresh the view
      redraw();
    });
  }; 
  
  var redraw = function() {
    // keep track of last date
    var lastDate = null;
    $.each(events, function(index, item) {
      var author = authors[item.authorId];
      var date = new Date(item.when);
      // if date changed, output a header
      if (!sameDay(date, lastDate)) {
       $('<li data-role="list-divider" data-dividertheme="e">' + date.toDateString() + '</li>').appendTo('#events');
      }
      var discussionString = "";
      if (item.discussionId != -1) {
        discussions.get(item.discussionId, function(discussion) {
          discussionString = "In discussion with " + discussion.comments.length + ' comments';
        });
      }
      $('<li data-category="' + item.type + '">' +
          '<h3><a href=""></a>' + item.title + '</h3>' +
          '<p>' + '⁤' + discussionString + '</p>' +
          
          
          '<div class="ui-li-accordion">' + 
            '<div class="pt-event-desc">' + item.description + '</div>'+
            '<div class="pt-event-when">When: ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + '</div>'+
            '<div class="pt-event-where">Where: ' + item.where + '</div>' +
             
             /*
                	'<div class="pt-nav">' + // Style of bottom banner
						
						'<button class="pt-button-4view pt-calendar">' +
						'<img src="images/icon-sync.png" />'   +
						'Cal Sync' +
						'</button>' +						
						
						'<button class="pt-button-4view pt-email">' + 
						'<img src="images/icon-email.png"/>' +
						'Email' +	
						'</button>' +
						
						'<button class="pt-button-4view pt-sms">' +
						'<img src="images/icon-sms.png" />'   +
						'SMS' +
						'</button>' +						
						
						'<button class="pt-button-4view pt-discuss">' + 
						'<img src="images/icon-discuss.png"/>' +
						'Discuss' +	
						'</button>' +	
          
         	      	'</div>' +
         	   
  	*/
         	      	
          '</div>' +
          
          
          '</li>').appendTo('#events').data('item', item);
      	lastDate = date;


    });
    
    $('#events').listview('refresh');
    
    // Link events
    $('#events .pt-calendar').click(function() {
      var li = $(this).closest('li');
      Android.addCalendar(li.data('item').title);
      return false;
    });
    $('#events .pt-email').click(function() {
      var li = $(this).closest('li');
      Android.sendEmail(li.data('item').title, li.data('item').where);
      return false;
    });
    $('#events .pt-sms').click(function() {
      var li = $(this).closest('li');
      Android.sendSMS(li.data('item').title);
      return false;
    });
    $('#events .pt-discuss').click(function() {
      var li = $(this).closest('li');
      var item = li.data('item');
      var discussionId = item.discussionId;
      if (discussionId != '-1') {
        changePage('discussions-item.html?id=' + discussionId);
      } else {
        changePage('discussions-post.html?title=' + item.title + '&description=' + item.description);
      }
      return false;
    });
  };
  
  // whenever this page is loaded, call init
  // scriptCache.onPageLoad('item.html', refresh);
  // call init the first time it's loaded too
  init();
  // hide badge
   $('#pt-home .pt-badge-events').hide();
})();