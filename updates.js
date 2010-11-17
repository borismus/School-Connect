(function() {
  var init = function() {
    alert('calling updates.js init');
  };
  // whenever this page is loaded, call init
  scriptCache.onPageLoad('item.html', init);
  // call init the first time it's loaded too
  init();
})();

var accordion = function() {
  $('#li').toggleClass('pt-accordion-open');
};