var  Store = require('../src/lib/word_store'),
    assert = require('assert');


describe('Store', function() {
    describe('add', function () {
        it('should return add a word to the store', function () {
            var word = [1,4,17,2];
            Store.add(word);
            var words = Store.list();
            console.log(words);
            assert(words[4]);
            //assert(_.indexOf(words[4], word));
        });
    });
});