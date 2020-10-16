'use strict';

function main () {
  initForms();
}

function initForms () {
  $('form').submit((e) => {
    e.preventDefault();
    const data = captureInputs(e.target);
    const project = $(e.target).find('[name=issue_project]').val();
    const action = $(e.target).attr('method');
    submitData(project, data, action);
    $('.issue-form').modal('hide');
  });
}

function submitData (project, data, method) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', handleRequest);
  req.addEventListener('error', handleError);
  req.open(method, '/' + project);
  req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  req.setRequestHeader( 'API-Request', 'true' );
  req.send(data);
}

function handleRequest() {
  const res = JSON.parse(this.responseText);
  const messageType = res.error ? 'danger' : 'success';
  const messageText = res.error ? { Error: res.error } : { Added: res };
  const next = () => location.reload();
  flashMessage(JSON.stringify(messageText, null, 2), messageType, next);
}

function handleError(err) {
  console.log("Error",this);
  if (!err) err = 'There was an error.';
  flashMessage(err, 'danger');
}

function captureInputs (form) {
  const inputs = $(form).find('input[type=text]');

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

function flashMessage (message, type, next) {
  const display = document.createElement('div').appendChild(document.createElement('pre'));
  display.setAttribute('class', `alert alert-${type}`);
  display.appendChild(document.createTextNode(message));
  document.querySelector('main').before(display);
  if (next) {
    setTimeout(next, 2000);
  }
}

$(document).ready(main());
if (typeof module !== 'undefined') module.exports = { main, captureInputs };
