'use strict';

const chai = require('chai');
const expect = chai.expect;
const document = {
  getElementById(id) {
    return { 
      id,
      addEventListener(event, fn) {
        this.event = event;
        this.listener = fn;
      }
    }
  }};
const client = require('../client/public/site.js');

describe('Client (Browser)', () => {
  it('Displays input fields for all relevant Issue fields');
  it('Attaches an event listener to the form submit button', () => {
    const button = client.main(null, document);
    expect(button).to.have.property('id').that.equals('btn-add');
    expect(button).to.have.property('event').that.equals('click');
    expect(button.listener).to.be.a('function');
  });
  it('Submits field data supplied to the API for processing');
  it('Retrieves a response from the API and displays it in a pop-up');
  it('Displays an error to the user if a problem is encountered');
});
