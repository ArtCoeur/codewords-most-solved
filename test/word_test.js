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

    describe('asPattern', function() {

        it('should add all dots when no cells are solved', function() {

            var word = new Word(['1','2','3','4']);
            var actual = word.asPattern();

            assert('....' == actual);
        });

        it('should only add dots when cells are not solved', function() {

            var word = new Word(['1','A','e','4']);
            var actual = word.asPattern();

            assert('.ae.' == actual);
        });

        it('should add no dots when all cells are solved', function() {

            var word = new Word(['d','E','a', 'D']);
            var actual = word.asPattern();

            assert('dead' == actual);
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

        it ('should not word when it does not contain number', function() {
            var word = new Word(['1','a','e','4']);
            assert(2 == word.numberSolved());
            word.update('10', 'b');
            assert(2 == word.numberSolved());
        });
    });
});