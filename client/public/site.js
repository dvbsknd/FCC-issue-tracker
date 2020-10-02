'use strict';
function main(e, ctx) {
  // Allows passing of a context manually for testing
  if (!ctx) ctx = document;
  const button = ctx.getElementById('btn-add');
  button.addEventListener('click', handleClick);
  return button;
}
function handleClick(e) {
  e.preventDefault();
  const data = captureInputs();
  const req = new XMLHttpRequest();
  req.addEventListener('load', handleRequest);
  req.addEventListener('error', handleError);
  req.open('POST', '/api/issues/test-AJAX');
  req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  req.send(data);
}
function handleRequest() {
  const res = JSON.parse(this.responseText);
  const messageType = res.error ? 'danger' : 'success';
  flashMessage(JSON.stringify(res, null, 2), messageType);
}
function handleError(err) {
  if (!err) err = 'There was an error.';
  flashMessage(err, 'danger');
}
function captureInputs () {
  const inputs = document.getElementById('issue-form')
    .getElementsByTagName('input');

  // Turn the data into an array of URL-encoded key/value pairs.
  const pairs = [];
  for (let input of inputs) {
    pairs.push(encodeURIComponent(input.name) + '=' + encodeURIComponent(input.value));
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to 
  // the '+' character; matches the behaviour of browser form submissions.
  const data = pairs.join( '&' ).replace( /%20/g, '+' );
  return data;
}
function flashMessage (message, type) {
  const display = document.createElement('div').appendChild(document.createElement('pre'));
  display.setAttribute('class', `alert alert-${type}`);
  display.appendChild(document.createTextNode(message));
  document.getElementById('issue-form').after(display);
}

/**
 * Presence of these objects needs to be checked to support
 * unit testing in a Node environment 
 */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', main);
}
if (typeof module !== 'undefined') { 
  module.exports = { main };
}
