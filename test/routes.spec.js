var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

var models = require('../models');
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var Page = models.Page;
var User = models.User;
var Promise = require('bluebird');




describe('http requests', function() {

    describe('GET /', function() {
        it('gets 200 on index', function(done) {
          agent
            .get('/')
            .expect(200, done);
        });
    });

    describe('GET /add', function() {
        it('gets 200 on add a page', function(done) {
          agent
          .get('/wiki/add')
          .expect(200, done);
        });
    });

    describe('GET /wiki/:urlTitle', function() {
        it('gets 404 on page that doesnt exist', function(done) {
          agent
          .get('/wiki/not a post')
          .expect(404, done);
        });
        it('gets 200 on page that does exist', function(done) {
          var testPage = new Page({
            title: "Title",
            content: "Content 1"
          });
          testPage.save().then(function() {
            agent
            .get('/wiki/Title')
            .expect(200, done);
          });
        });
    });

    describe('GET /wiki/search', function() {
        it('gets 200', function(done) {
          agent
          .get('/wiki/search?search=asdf')
          .expect(200, done);
        });
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        var testPage, similarPage, notSimilarPage;
        // beforeEach(function(done) {
        //     Page.remove({})
        //     .then(function(){
        //         done();
        //     });
        // });
        beforeEach(function(done) {
            testPage = new Page({
                title: "Title1",
                content: "Content1",
                tags: ["Cool", "Cold"]
            });
            similarPage = new Page({
                title: "Title Sim",
                content: "Content Sim",
                tags: ["Cool"]
            });
            notSimilarPage = new Page({
                title: "Title Not Sim",
                content: "Content Not Sim",
                tags: ["Warm", "Hot"]
            });
            var a = testPage.save(),
                b = similarPage.save(),
                c = notSimilarPage.save();
            Promise.all([a,b,c]).then(function(){
                done();
            });
        });
        it('gets 404 for page that doesn\'t exist', function(done) {
          agent
          .get('/wiki/blah/similar')
          .expect(404, done);
        });
        it('gets 200 for similar page', function(done) {
          agent
          .get('/wiki/Title1/similar')
          .expect(200, done);
        });
    });


    describe('POST /wiki/add', function() {
        // beforeEach(function(done) {
        //     Page.remove({})
        //     .then(function(){
        //         done();
        //     });
        // });
        it('creates a page in db', function(done) {
          agent
          .post('/wiki')
          .send({
            title: 'Title5',
            content: 'Content5',
            name: 'Name5',
            email: 'Email5'
          })
          .expect(302)
          .end(function (err, res) {
            if(err) return done(err);
            Page.findOne({title: 'Title5'})
            .then(function(page){
                 console.log(page);
                 return page;
             })
            .then(function(item) {
              expect(item.content).to.equal('Content5');
              done();
          });
          });
        });
    });

 // describe('POST /wiki/', function(done) {
 //       it('creates a page in db', function(done) {
 //           agent
 //                 .post('/wiki')
 //                 .send( {
 //                         name: 'matt',
 //                         email: 'email@matt',
 //                         title: 'Fooby',
 //                         content: 'stuff',
 //                         tags: 'hey'
 //                     }
 //                 )
 //                 .expect(302)
 //                 .end(function(err, res){
 //                     if (err) return done(err);
                   
 //                   Page.findOne({title:'Fooby'})
 //                     .then(function(page){
 //                         console.log(page)
 //                         return page;
 //                     }).then(function(page){
 //                         expect(page.title).to.equal('Fooby')
 //                       done();
 //                     })
 //                 })



                 
                     
 //               // .expect(Page.findOne({title:'Fooby'}).to.have.length(1))

 //       });
 //   });
});