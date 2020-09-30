'use strict';

const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

const testIssue = {
  issue_title: 'Test issue',
  issue_text: 'This is a test issue',
  created_by: 'Mocha',
  assigned_to: 'Mocha',
  status_text: 'New'
};
const testIssueKeys = Object.keys(testIssue);

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
  context('When POSTing to /api/issues/{projectname}', () => {
    let data;
    before((done) => {
      chai.request(server)
        .post('/api/issues/test-project')
        .type('form')
        .send(testIssue)
        .end((err, res) => {
          if (err) done(err);
          else {
            data = res;
            done();
          }
        });
    });
    it('accepts form data conforming to the expected type', (done) => {
      expect(data).to.have.status(200);
      expect(data).to.be.json;
      testIssueKeys.forEach((key) => {
        expect(data.body).to.have.property(key).that.equals(testIssue[key]);
      });
      done();
    });
  });
});
