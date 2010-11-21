(function() {
  
  // load fake JSON data
  var init = function() {
    // alert('calling updates.js init');
    // load the report data in JSON 
    $.getJSON('data/reports.json', function(data) {
      var reportUpdates = data.data;
      // sort the data in recent first
      reportUpdates.sort(function(a, b) {
        return new Date(b.posted) - new Date(a.posted);
      });
      reports = reportUpdates;
      // refresh the view
      redraw();
    });
  };
  
  var redraw = function() {
    $.each(reports, function(index, item) {
      switch(item.type) {
        case "behavior":
          $('<li data-category="' + item.type + '">' +
              '<img src="images/' + (item.behavior_type == 'True' ? 'behavior-good.png' : 'behavior-bad.png') +'" />' +
              '<h3><a href=""></a>' + item.title + '</h3>' +
              '<p>' + new Date(item.posted).toDateString() + '</p>' +
            '</li>').appendTo('#reports');
          break;
        case "attendance":
          $('<li data-category="' + item.type + '">' +
              '<h3><a href=""></a>Unauthorized absense</h3>' +
              '<p><strong>' + new Date(item.missed).toDateString() + '</strong></p>' +
            '</li>').appendTo('#reports');
          break;
        case "grade":
          var author = authors[item.authorId];
          $('<li class="ui-li-has-thumb" data-category="' + item.type + '">' +
              '<div class="pt-report-grade">' + item.grade + '</div>' +
              '<h3><a href=""></a>' + item.title + '</h3>' +
              '<p>' + new Date(item.posted).toDateString() + '</p>' +
              '<div class="ui-li-accordion">' + 
                '<img src="' + author.image +  '" />' +
                '<div class="pt-report-description">Assignment posted by ' + author.name + '<br/>' + item.description + '</div>' +
                '<div class="pt-nav">' +
                  '<div class="pt-nav-item"><img src="images/email.png" class="pt-nav-icon" />Email</div>' +
                  '<div class="pt-nav-item"><img src="images/sms.png" class="pt-nav-icon" />SMS</div>' +
                '</div>' +
              '</div>' +
          '</li>').appendTo('#reports');
          break;
        default:
      }
    });
    
    $('<li data-category="grade" data-theme="e"><a href="graph.html">Grade History</a></li>').appendTo('#reports');
    $('#reports').listview('refresh');
  };
  
  // whenever this page is loaded, call init
  // scriptCache.onPageLoad('item.html', refresh);
  // call init the first time it's loaded too
  init();
})();