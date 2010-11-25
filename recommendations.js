(function() {
  
  // load fake JSON data
  var init = function() {
    // alert('calling updates.js init');
    // load the recommendation data in JSON 
    $.getJSON('data/recommendations.json', function(data) {
      var types = {};
      // sort the data by type
      $.each(data.data, function(index, item) {
        if (types[item.type] == undefined) {
          types[item.type] = [];
        }
        types[item.type].push(item);
      });
      
      $.each(types, function(type, typeArray) {
        typeArray.sort(function(a, b) {
          return b.posted - a.posted;
        });
        recommendations = recommendations.concat(typeArray);
      });
      
      // refresh the view
      redraw();
    });
  };
  
  var formatType = function(type) {
    return $('#recommendations').find("[value=" + type + "]").text();
  };
  
  var redraw = function() {
    var lastType = null;
    $.each(recommendations, function(index, item) {
      authors.get(item.authorId, function(author) {
        var type = item.type;
        if (type != lastType) {
          $('<li data-role="list-divider" data-category="header">' + formatType(item.type) + '</li>').appendTo('#recommendations');
        }
        $('<li data-category="' + item.type + '">' +
            '<h3><a href="recommendations-item.html?id=' + item.id + '"></a>' + item.title + '</h3>' +
            '<p>' + item.description + '</p>' +
            '<p>From ' + author.name + '</p>' +
        '</li>').appendTo('#recommendations');
        lastType = type;
      });

    });
    
    $('#recommendations').listview('refresh');
  };
  
  // whenever this page is loaded, call init
  // scriptCache.onPageLoad('item.html', refresh);
  // call init the first time it's loaded too
  init();
})();