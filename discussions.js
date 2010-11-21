(function() {
  
  var init = function() {
    // alert('calling discussions init');
    redraw();
  };
  
  var redraw = function() {
    $.each(discussions, function(index, item) {
      var author = authors[item.authorId];
      $('<li data-category="' + item.type + '">' +
          '<img src="' + author.image + '" />' +
          '<h3><a href="discussions-item.html?id=' + item.id + '"></a>' + item.title + '</h3>' +
          '<p>Started by ' + author.name  + ' - ' + item.comments.length + ' comments</p>' +
      '</li>').appendTo('#discussions');
    });
    
    $('#discussions').listview('refresh');
  };
  
  // whenever this page is loaded, call init
  // scriptCache.onPageLoad('item.html', refresh);
  // call init the first time it's loaded too
  init();
})();