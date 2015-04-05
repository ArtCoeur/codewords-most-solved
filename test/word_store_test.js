var  Store = require('../src/lib/word_store'),
    assert = require('assert'),
    Word = require("../src/lib/word");


describe('Store', function() {

    after(function(done){
        Store.clear();
        done();
    });

    describe('add', function () {
        it('should return add a word to the store', function () {
            var word = [1,4,17,2];
            Store.add(word);
            var words = Store.list();
            assert(words);

            assert(words[0].equals(new Word(word)));

            var word_2 = [10,2,1,23];
            Store.add(word_2);

            words = Store.list();
            assert(words[1].equals(new Word(word_2)));

            Store.clear();
        });
    });

    describe('mostSolved', function() {
        it('should return the word with the most solved cells', function () {
            var word_1 = [2, 21,'d',14,8];
            var word_2 = [1,14,4];
            Store.add(word_1);
            Store.add(word_2);

            var result = Store.mostSolved();

            assert(result.equals(new Word(word_1)));
            var word_3 = ['a', 'b', 6, 14, 3];
            Store.add(word_3);
            result = Store.mostSolved();

            assert(result.equals(new Word(word_3)));

            Store.clear();
        });
    });

    describe('update', function() {
       it ('should update all words', function() {
           var word_1 = [2, 21,'d','i','m'];
           var word_2 = [1,10,10,'o','w'];
           Store.add(word_1);
           Store.add(word_2);

           var result = Store.mostSolved();
           console.log(result);
           assert(result.equals(new Word(word_1)));

           // setting number 10 to equal 'l' means word_2 has 2 solved cells
           Store.update(10, 'l');
           var result = Store.mostSolved();
           console.log(result);

           assert(result.equals(new Word(word_2)));

           Store.clear();
       });
    });
});