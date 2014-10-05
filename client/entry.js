var state = 0;
var places = ['Boston', 'Dallas', 'San Francisco', 'Seattle'];

$(function() {
  var $locs = $('#locs');
  var $curr;
  var currIdx = 0;
  var els = [];
  _.forEach(places, function(place) {
    var el = $('<li>' + place + '</li>');
    els.push(el);
    $locs.append(el);
  });
  $curr = els[currIdx];
  $curr.addClass('selected');

  $(document).keydown(function(e) {

    if (state === 0) {

      if (e.keyCode === 13) {
        // progresss to state 2
        e.preventDefault();
        $('#step1').addClass('hidden');
        $('#step2').removeClass('hidden');
        state = 1;
      }

    } else if (state === 1) {

      if (e.keyCode === 37 || e.keyCode === 38) {
        e.preventDefault();

        // Down
        $curr.removeClass('selected');
        var idx = --currIdx;
        if (idx < 0) {
          idx = currIdx = els.length - 1;
        }
        $curr = els[idx];
        $curr.addClass('selected');

      } else if (e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();

        // Up
        $curr.removeClass('selected');
        var idx = ++currIdx;
        if (idx >= els.length) {
          idx = currIdx = 0;
        }
        $curr = els[idx];
        $curr.addClass('selected');

      } else if (e.keyCode === 13) {
        e.preventDefault();

        // Select
        var loc = $curr.text();
        window.location = '/viz/?loc=' + loc;
      }

    }

  });
});
