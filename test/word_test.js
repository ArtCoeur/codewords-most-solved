var assert = require('assert'),
    Word = require('../src/lib/word');


describe('Word', function() {

    describe('equals', function () {

        it('should equal itself', function () {
            var word = new Word(['12','14','7']);
            assert(word.equals(word));
        });

        it('should equal another word with same cells', function () {
            var word_1 = new Word(['12','14','7']);
            assert(word_1.equals(new Word(['12','14','7'])));
        });
    });

    describe('numberSolved', function() {
        it ('should return 2 when 2 cells are solved', function() {
            var word = new Word(['1','a','e','4']);
            assert(2 == word.numberSolved());
        });
        it ('should return 0 when no cells are solved', function() {
            var word = new Word(['1','13','26','4']);
            assert(0 == word.numberSolved());
        });
        it ('should return length when all cells are solved', function() {
            var word = new Word(['d','e','a', 'd']);
            assert(4 == word.numberSolved());
        });
    });

    describe('isSolved', function() {
        it('should return false when not solved', function() {
            var word = new Word(['1','a','e','4']);
            assert(!word.isSolved());
        });

        it('should return true when solved', function() {
            var word = new Word(['D','a','e','d']);
            assert(word.isSolved());
        });
    });

    describe('update', function() {
        it ('should update its own cells', function() {
            var word = new Word(['1','a','e','4']);
            assert(2 == word.numberSolved());
            word.update('1', 'b');
            assert(3 == word.numberSolved());
        });

        it ('should not change word when it does not contain number', function() {
            var word = new Word(['1','a','e','4']);
            assert(2 == word.numberSolved());
            word.update('10', 'b');
            assert(2 == word.numberSolved());
        });

        it ('should return true if solved', function() {
            var word = new Word(['c', '2', '4']);
            var solved = word.update('2', 'o');
            assert(false == solved);
            solved = word.update('4', 'w');
            assert(solved);
        });
    });
});