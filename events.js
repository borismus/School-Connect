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
      if (date - lastDate !== 0) {
        //$('<li data-role=".pt-list-divider">' + date.toDateString() + '</li>').appendTo('#events');
        
        $('<li data-role=".pt-nav-date">' + date.toDateString() + '</li>').appendTo('#events');
      }
      $('<li data-category="' + item.type + '">' +
          '<h3 class=".pt-report-title"><a href=""></a>' + item.title + '</h3>' +
          '<div class="ui-li-accordion">' + 
            '<div class="pt-report-postedby">In Discussion: ' + item.discussionId + '</div>' +
            '<div class="pt-event-when">When: ' + item.time + '</div>'+
            '<div class="pt-event-where">Where: ' + item.where + '</div>' +
                	'<div class="pt-nav">' + // Style of bottom banner
						
						'<button class="pt-button-4view">' +
						'<img src="images/icon-sync.png" />'   +
						//'<span class="icon1" > </span>' +
						'Calendar Sync' +
						'</button>' +						
						
						'<button class="pt-button-4view">' + 
						'<img src="images/icon-email.png"/>' +
						//'<span class="icon2"> </span>' +
						'Email' +	
						'</button>' +
						
						'<button class="pt-button-4view">' +
						'<img src="images/icon-sms.png" />'   +
						//'<span class="icon1" > </span>' +
						'SMS' +
						'</button>' +						
						
						'<button class="pt-button-4view">' + 
						'<img src="images/icon-s.png"/>' +
						//'<span class="icon2"> </span>' +
						'Discuss' +	
						'</button>' +


                  		
                	'</div>' +
          '</div>' +
      '</li>').appendTo('#events');
      lastDate = date;
    });
    
    $('#events').listview('refresh');
  };
  
  // whenever this page is loaded, call init
  // scriptCache.onPageLoad('item.html', refresh);
  // call init the first time it's loaded too
  init();
})();