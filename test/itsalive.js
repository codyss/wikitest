var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);


describe('plus', function () {
  var a, b;
  beforeEach(function () {
    a = 2;
    b = 2;
  });
  it('sums two twice', function () {
    var result = a + b;
    expect(result).to.equal(4);
  });
});


describe('timer', function () {
    var start, end;
    it('waits the right amount of time', function (done) {
      //grab start time, grab finish time - then subtract
      start = new Date();
      setTimeout(function () {
        end = new Date()
        var result = -start.valueOf() + end.valueOf();
        expect(result).to.be.closeTo(1000,10);
        done();
    }, 1000);
      
  })
})


describe('for each calls callback each time', function () {
    var test = function test () {
      console.log("I've been run!");
    };
    var spy = chai.spy(test);
    it('runs four times on a four item array', function () {
      var four = [1,2,3,4];
      four.forEach(spy);
      expect(spy).to.have.been.called.exactly(4);      
    });
})

describe('Page model', function() {

    describe('Validations', function() {
        xit('errors without title', function() {});
        xit('errors without content', function() {});
    });

    describe('Statics', function() {
        describe('findByTag', function() {
            xit('gets pages with the search tag', function() {});
            xit('does not get pages without the search tag', function() {});
        });
    });

    describe('Methods', function() {
        describe('findSimilar', function() {
            xit('never gets itself', function() {});
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



// var expect = require('chai').expect;
// describe('+', function () {
//     var posNum, negNum;
//     beforeEach(function () {
//         posNum = 100;
//         negNum = -50;
//     });
//     it('sums two positive numbers', function () {
//         var result = posNum + posNum;
//         expect(result).to.equal(200);
//     });
//     it('sums two negative number', function () {
//         var result = negNum + negNum;
//         expect(result).to.equal(-100);
//     });
//     it('sums a negative and a positive', function () {
//         var result = negNum + posNum;
//         expect(result).to.equal(50);
//     });
//     it('is commutative', function () {
//         var resultA = negNum + posNum,
//             resultB = posNum + negNum;
//         expect(resultA).to.equal(resultB);
//     });
// });
// describe('-', function () {
//     ...
//     // another group of tests belongs here
//     ...
// });
// describe('/', function () {
//     ...
//     // you get the idea
//     ...
// });