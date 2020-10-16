'use strict';

const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

const testIssue = {
  issue_title: 'Test issue',
  issue_text: 'This is a test issue',
  created_by: 'Mocha',
  assigned_to: 'Mocha',
  status_text: 'New'
};
const testIssueKeys = Object.keys(testIssue);

describe('API', () => {
  context('When POSTing valid data to /{projectname}', () => {
    let data;
    before((done) => {
      chai.request(server)
        .post('/test-project')
        .set('API-Request', 'true')
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
    it('Returns an _id from the database evidencing that the item was stored', (done) => {
      expect(data.body).to.have.property('_id');
      done();
    });
  });
  context('When POSTing incomplete data to /{projectname}', () => {
    let data;
    const invalidIssue = Object.assign({}, testIssue);
    delete invalidIssue.created_by;
    before((done) => {
      chai.request(server)
        .post('/test-project')
        .set('API-Request', 'true')
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
    it('Returns an JSON error if required fields are not supplied', (done) => {
      expect(data).to.have.status(400);
      expect(data).to.be.json;
      expect(data.body).to.have.property('error').that.equals('Invalid issue data provided');
      done();
    });
  });
  context('When POSTing unnecesary data to /{projectname}', () => {
    let data;
    const overweightIssue = Object.assign({ bogus_field: 'Bogus Data' }, testIssue);
    before((done) => {
      chai.request(server)
        .post('/test-project')
        .set('API-Request', 'true')
        .type('form')
        .send(overweightIssue)
        .end((err, res) => {
          if (err) done(err);
          else {
            data = res;
            done();
          }
        });
    });
    it('Ignores fields which are unexpected', (done) => {
      expect(data).to.have.status(200);
      expect(data).to.be.json;
      testIssueKeys.forEach((key) => {
        expect(data.body).to.have.property(key).that.equals(testIssue[key]);
      });
      done();
    });
    it('Returns an _id from the database evidencing that the item was stored', (done) => {
      expect(data.body).to.have.property('_id');
      done();
    });
  });
  context('When GETting a list of all issues from /', () => {
    let data;
    before((done) => {
      chai.request(server)
        .get('/')
        .set('API-Request', 'true')
        .end((err, res) => {
          if (err) done(err);
          else {
            data = res;
            done();
          }
        });
    });
    it('Should return a JSON array of issues with valid fields', (done) => {
      expect(data).to.have.status(200);
      expect(data).to.be.json;
      expect(data.body).to.be.a('array');
      data.body.forEach(issue => {
        testIssueKeys.forEach(key => {
          expect(issue).to.have.property(key);
        });
      });
      done();
    });
    it('Should return issues for all projects');
  });
  context('When GETting a list of all issues from /{projectname}', () => {
    let data;
    before((done) => {
      chai.request(server)
        .get('/test-project')
        .set('API-Request', 'true')
        .end((err, res) => {
          if (err) done(err);
          else {
            data = res;
            done();
          }
        });
    });
    it('Should return an array of JSON', (done) => {
      expect(data).to.have.status(200);
      expect(data).to.be.json;
      expect(data.body).to.be.a('array');
      done();
    });
    it('Should return Issues with valid fields', (done) => {
      data.body.forEach(issue => {
        testIssueKeys.forEach(key => {
          expect(issue).to.have.property(key);
        });
      });
      done();
    });
    it('Should return issues for the specified project only', (done) => {
      data.body.forEach(issue => {
        expect(issue).to.have.property('project').that.equals('test-project');
      });
      done();
    });
  });
  context('When PUTting an updated issue', () => {
    let issue;
    let data;
    before((done) => {
      chai.request(server)
        .get('/test-project')
        .set('API-Request', 'true')
        .end((err, res) => {
          if (err) done(err);
          else {
            issue = res.body[0];
            issue.issue_title = "Updated test issue";
            chai.request(server)
              .put('/test-project')
              .set('API-Request', 'true')
              .type('form')
              .send(issue)
              .end((err, res) => {
                if (err) done(err);
                else {
                  data = res;
                  done();
                }
              });
          }
        });
    });
    it('Should return a JSON object', () => {
      expect(data).to.have.status(200);
      expect(data).to.be.json;
    });
    it('Should return the updated Issue', () => {
      expect(data.body.issue_title).to.equal('Updated test issue');
    });
  });
});
