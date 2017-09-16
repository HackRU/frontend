$(document).ready(function () {
  $(document).keydown(function () {
    var right = 39, left = 37;
    if(event.which == 39 || event.which == 37) {
      var user_id = $('#user_id').val();
      var accept = (event.which == 39)? '1' : '0';
      var url = "/admin-swiped?user_id=" + user_id + "&accepted=" + accept;
      $.get(url).done(function(data){
        console.log(data);
        if(data.done){
          window.location.reload(true);
        }else{
          console.log(data);
          $('#user_answer').text(data.user.short_answer || '');
          $('#user_level_of_study').text(data.user.grad_year || '');
          $('#user_gender').text(data.user.mlh_data.gender || '');
          $('#counts').text(JSON.stringify(data.counts, null, '\t'));
          $('#user_id').val(data.user._id);
        }
      });
    }
  });
});
