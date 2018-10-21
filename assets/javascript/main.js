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

$(document).ready(function(e){

  $(".card").flip();

  $(".card .back").on("click", function(e){
    var card = $(this).parent().first();
    var questionIsVisible = $(card).find(".question").is(':visible');

    if (questionIsVisible) {
      showAnswer(card);
      e.preventDefault();
      e.stopImmediatePropagation();
    } else {
      hideAnswer(card);
    }
  });

});
