'use strict';

const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

describe('server.js', () => {
  it('says hello', (done) => {
  chai.request(server)
  .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('message').that.equals('Hello, World.');
        done();
  });
}); 
  
})
