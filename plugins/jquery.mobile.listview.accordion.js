/*
* jQuery Mobile Framework : listview accordion extension
* Copyright (c) Boris Smus
* Note: Code is in draft form and is subject to change 
*/
(function($, undefined ) {

$( "[data-role='listview']" ).live( "listviewcreate", function() {
	var list = $( this ),
		listview = list.data( "listview" );
	
	list.find('.ui-li-accordion').each(function(index, accordion) {
		// Format the accordion accordingly:
		// <li>...normal stuff in a jQM li
		//   <div class="ui-li-accordion-body">...contents of this</div>
		// </li>
		// If we find an accordion element, make the li action be to open the accordion element
		console.log('accordion found ' + accordion);
		// Get the li 
		var $accordion = $(accordion);
		$li = $accordion.closest('li');
		// Append the contents of the accordion element to the end of the <li>
		$li.append('<div class="ui-li-accordion-body">' + $accordion.html() + '</div>');
		// Unbind all click events
		$li.unbind('click');
		// Remove all a elements
		$li.find('a').remove();
		// Bind click handler to show the accordion
		$li.bind('click', function() {
			// Close all other accordion flaps
			// list.find('.ui-li-accordion-open').removeClass('ui-li-accordion-open');
			// Open this flap
			$(this).toggleClass('ui-li-accordion-open');
		});
		// Remove the original accordion element
		$accordion.remove();
	});
});

})( jQuery );
