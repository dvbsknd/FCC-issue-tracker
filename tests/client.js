'use strict';

const chai = require('chai');
const expect = chai.expect;
const mockDocument = {
  addEventListener(event, fn) {
    this.event = event;
    this.listener = fn;
  },
  getElementById(id) {
    return { 
      id,
      addEventListener: document.addEventListener
    }
  }};
global.document = mockDocument;
const client = require('../public/site.js');

describe('Client (Browser)', () => {
  it('Renders a list of all issues on the home page');
  it('Attaches an event listener to the form submit button', () => {
    const button = client.main();
    expect(button).to.have.property('id').that.equals('btn-add');
    expect(button).to.have.property('event').that.equals('click');
    expect(button.listener).to.be.a('function');
  });
  it('Captures input for all relevant Issue fields');
  it('Submits field data supplied to the API for processing');
  it('Retrieves a response from the API and displays it in a pop-up');
  it('Displays an error to the user if a problem is encountered');
});
