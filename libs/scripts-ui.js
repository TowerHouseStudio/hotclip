$(document).ready(function(){
  
  $( ".arrow-tab" ).click(function() {
  $( ".frame-boxes" ).animate({
     width: "toggle"
  }, 100, function() {
    $( ".frame-boxes-hide" ).show();
    
  });
});

    $( ".arrow-tab-hide" ).click(function() {
      $( ".frame-boxes-hide" ).hide( 100, function() {
    $( ".frame-boxes" ).animate({
     width: "toggle"
  }, 100, function() {
      
  });
  });
       });

    $( ".discard-button").hideTagger();
    $( ".save-button").hideTagger();
  
});