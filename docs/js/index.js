$(document).ready(function () {
  $('#button-loginForm').click(function (e) {
    
    // Clear previous messages //
    $('#message').html('');
    console.log*('Login button clicked');
    const username = $('#username').val().trim();
    const password = $('#password').val().trim();

    if (!username || !password) {
      $('#message').html('<span class="text-danger">Please enter both username and password.</span>');
      return;
    }

    $.ajax({
      url: 'https://misdemo.temple.edu/auth',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function (response) {
        // Assuming the response contains a token property
        if (response && response.usertoken) {
          localStorage.setItem('usertoken', response.usertoken);
          window.location.href = 'main.html';
        } else {
          $('#message').html('<span class="text-danger">Login failed: Invalid response from server.</span>');
        }
      },
      error: function (xhr) {
        let msg = 'Login failed. Please check your credentials and try again.';
        if (xhr.responseJSON && xhr.responseJSON.message) {
          msg = xhr.responseJSON.message;
        }
        $('#message').html(`<span class="text-danger">${msg}</span>`);
      }
    });
  });
});