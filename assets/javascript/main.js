function showAnswer(card){
  $(card).find('.question').hide();
  $(card).find('.answer').fadeIn('slow');
};

function hideAnswer(card){
  setTimeout(function(){
    $(card).find('.answer').hide();
    $(card).find('.question').show();
  }, 300);
};

function calculateHousePoints(){
  ['Gryffindor', 'Hufflepuff', 'Slytherin', 'Ravenclaw'].forEach(function(elem){
    var cards = $('.' + elem + '-point');
    var cardPointsArray = $.map(cards, function(item){ return parseInt($(item).find('.front .inner-text').text()); });
    var totalPoints = cardPointsArray.reduce(function(reducer, val) { return reducer + val }, 0);
    var counter = $('#' + elem.toLowerCase() + '-counter');
    $(counter).text(totalPoints);
  })
};

$(document).ready(function(e){

  $('.card').flip();

  $('.card .back').on('click', function(e){
    var card = $(this).parent().first();
    var questionIsVisible = $(card).find('.question').is(':visible');

    if (questionIsVisible) {
      showAnswer(card);
      e.preventDefault();
      e.stopImmediatePropagation();
    } else {
      hideAnswer(card);
    }
  });

  $('.card').on('click', function(e){
    $('#current-card').removeAttr('id');
    $(this).attr('id', 'current-card');
  });

  $('.house').on('click', function(e){
    if ($('#current-card').length) {
      var houseName = $(this).find('h1').text();
      var unclaimed = !$('#current-card').find('.house-name').length;
      var beingAnswered = $('#current-card').find('.question').is(':visible') || $('#current-card').find('.answer').is(':visible');

      if (unclaimed && beingAnswered) {
        var newElement = '<div class="house-name red">' + houseName + '</div>';
        $('#current-card').find('.front').append(newElement);
        $('#current-card').find('.answer').append(newElement);
        $('#current-card').find('.question').append(newElement);
        $('#current-card').addClass(houseName + '-point');
        $('#current-card').removeAttr('id');
      }
      
      calculateHousePoints();
    }
  })

});
