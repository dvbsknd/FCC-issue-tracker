'use strict';

const chai = require('chai')
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Server', () => {
  it('Serves an HTML home page at /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.html = cheerio.load(res.text);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        expect(res.html('#site-title').text()).to.equal('Issue Tracker');
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
        expect(res.text).to.equal('404 Error');
        done();
      });
  });
});
