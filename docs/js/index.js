$(document).ready(function () {
  $('#button-loginForm').click(function (e) {
    
    console.log('Login button clicked');
    // Clear previous messages //
    $('#message-login').html('');
    const username = $('#username').val().trim();
    const password = $('#password').val().trim();

    if (!username || !password) {
      $('#message-login').html('<span class="text-danger">Please enter both username and password.</span>');
      return;
    }

    $.ajax({
      url: 'https://misdemo.temple.edu/auth',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function (response) {
        // a string is 
        if (typeof response === 'string') {
          $('#message-login').html('<span class="text-danger">Login failed. Please check your credentials and try again.</span>');
          return;
        }
        response = response[0]; // Assuming the response is an array with one object
        // Assuming the response contains a token property
        if (response && response.usertoken) {
          localStorage.setItem('usertoken', response.usertoken);
          window.location.href = 'main.html';
        } 
      },
      error: function (xhr) {
        let msg = 'Unepected error. Invalid response from server. ';
        if (xhr.responseJSON && xhr.responseJSON.message) {
          msg += xhr.responseJSON.message;
        }
        $('#message-login').html(`<span class="text-danger">${msg}</span>`);
      }
    });
  });
});