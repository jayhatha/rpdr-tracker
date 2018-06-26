$(document).ready(() => {
  // initializing materialize stuff
M.AutoInit();
$('#alert_close').click(function(){
    $( "#alert_box" ).fadeOut( "slow", function() {
    });
  });

// passes queen's name from "add to list" button to add form
$(document).on("click", ".addqueen", function () {
     var thisQueen = $(this).data('id');
     $("#queenId").val( thisQueen );
});

// delete a queen from your list
$('.delete').on('click', function(event) {
      event.preventDefault();
      var url = $(this).attr('href');
      console.log(url);
      $.ajax({
        method: 'DELETE',
        url: url
      }).done(function(data) {
        console.log(data);

        window.location = window.location.pathname;
      });
    });

// rename your list
$('.update').on('submit', function(event) {
    event.preventDefault();
    console.log('form submitted');
    var newData = $(this).serialize();
    var url = $(this).attr('action');
    $.ajax({
        method: 'PUT',
        url: url,
        data: newData
    }).done(function(data) {
      console.log('data!');
      window.location = window.location.pathname;
    });
  });
});
