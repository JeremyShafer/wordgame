$(document).ready(function () {

  // if user is not logged in, redirect to index.html
  const usertoken = localStorage.getItem('usertoken');
  if (!usertoken) {
    window.location.href = 'index.html';
  } else {
    $("body").show();
  }

  // if logout button is clicked, kill the usertoken and redirect
  $('#logout-btn').click(function () {
    localStorage.removeItem('usertoken');
    window.location.href = 'index.html';
  });

});