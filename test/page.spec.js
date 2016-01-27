var models = require('../models');
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var Page = models.Page;
var User = models.User;
var Promise = require('bluebird');


describe('Page model', function() {

    describe('Validations', function() {
        var page;
        beforeEach(function() {
            page = new Page();
        })
        it('errors without title', function() {
            page.save(null, function(err){
                expect(err.errors).to.have.property('title');
                done();
            })
        });
        it('errors without content', function() {
            page.save(null, function(err){
                expect(err.errors).to.have.property('content');
                done();
            })
        });
    });

    describe('Statics', function() {
        var testPage;
        beforeEach(function(done) {
            Page.remove({})
            .then(function(){
                done();
            })
        });
        beforeEach(function(done) {
            testPage = new Page({
                title: "Title1",
                content: "Content1",
                tags: ["Cool", "Cold"]
            })
            testPage.save(function(){
                done();
            });
        });
        describe('findByTag', function() {
            it('gets pages with the search tag', function(done) {
                Page.findByTag("Cool")
                .then(function(pages){
                    expect(pages[0].title).to.equal("Title1");
                    done();
                }).then(null, done);
                
            });
            it('does not get pages without the search tag', function(done) {
                Page.findByTag("Hot")
                .then(function(pages){
                    expect(pages).to.have.lengthOf(0);
                    done();
                }).then(null, done);
            });            
        });
    });

    describe('Methods', function() {
        var testPage, similarPage, notSimilarPage;
        beforeEach(function(done) {
            Page.remove({})
            .then(function(){
                done();
            })
        });
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

        describe('findSimilar', function() {
            it('never gets itself', function(done) {
                testPage.findSimilar()
                .then(function(pages){
                    expect(pages).to.have.lengthOf(1);
                    done();
                }).then(null, done);
            });
            xit('gets other pages with any common tags', function() {});
            xit('does not get other pages without any common tags', function() {});
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            xit('returns the url_name prepended by "/wiki/"', function() {});
        });
    });

    describe('Hooks', function() {
        xit('it sets urlTitle based on title before validating', function() {});
    });

});
