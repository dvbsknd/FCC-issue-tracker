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
  it('Says hello when GETting /', (done) => {
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
  it('Responds with a valid Content-Security-Policy header', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.header('Content-Security-Policy');
        done();
      });
  });
  it('Gives a 404 and a JSON error when accesing an unknown route', (done) => {
    chai.request(server)
      .post('/random')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res).to.be.json;
        expect(res.body).to.have.property('error').that.equals('Unknown route');
        done();
      });
  });
  context('When POSTing valid data to /api/issues/{projectname}', () => {
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
    it('Returns a JSON object with keys/values matching what was supplied', (done) => {
      expect(data).to.have.status(200);
      expect(data).to.be.json;
      testIssueKeys.forEach((key) => {
        expect(data.body).to.have.property(key).that.equals(testIssue[key]);
      });
      done();
    });
  });
  context('When POSTing incomplete data to /api/issues/{projectname}', () => {
    let data;
    const invalidIssue = Object.assign({}, testIssue);
    delete invalidIssue.created_by;
    before((done) => {
      chai.request(server)
        .post('/api/issues/test-project')
        .type('form')
        .send(invalidIssue)
        .end((err, res) => {
          if (err) done(err);
          else {
            data = res;
            done();
          }
        });
    });
    it('Returns an error if required fields are not supplied', (done) => {
      expect(data).to.have.status(400);
      expect(data).to.be.json;
      expect(data.body).to.have.property('error').that.equals('Missing required fields');
      done();
    });
  });
});
