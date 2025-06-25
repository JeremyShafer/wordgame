$(document).ready(function () {
  $('#button-login').click(function (e) {
    
    console.log('Login button clicked');
    // Clear previous messages //
    $('#message-login').html('');
    $('#message-login').removeClass();

    const username = $('#username').val().trim();
    const password = $('#password').val().trim();

    if (!username || !password) {
      $('#message-login').addClass("alert alert-danger")
      $('#message-login').html('Please enter both username and password.');
      return;
    }

    let theserializeddata = $("#loginForm").serialize();
    console.log(theserializeddata);
    $.ajax({
      url: 'https://misdemo.temple.edu/auth',
      type: 'POST',
      data: theserializeddata,
      success: function (response) {
        // a string is 
        console.log('Login successful');
        console.log(response);
        if (typeof response === 'string') {
          $('#message-login').addClass("alert alert-danger")
          $('#message-login').html('Login failed. Please check your credentials and try again.');
          return;
        }
        console.log(response);
        // Assuming the response contains a token property
        if (response && response.user_id) {
          localStorage.setItem('usertoken', response.user_id);
          window.location.href = 'main.html';
        } 
      },
      error: function (xhr) {
        let msg = 'Unepected error. Invalid response from server. ';
        if (xhr.responseJSON && xhr.responseJSON.message) {
          msg += xhr.responseJSON.message;
        }
        $('#message-login').addClass("alert alert-danger");
        $('#message-login').html(`${msg}`);
      }
    });
  });
});