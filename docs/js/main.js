$(document).ready(function () {
  const usertoken = localStorage.getItem('usertoken');
  if (!usertoken) {
    window.location.href = 'index.html';
  }
});