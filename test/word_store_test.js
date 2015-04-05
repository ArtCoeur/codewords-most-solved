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
            var board = 'abcdefg';
            var word = [1,4,17,2];
            Store.add(board, word);
            var words = Store.list(board);
            assert(words);

            assert(words[0].equals(new Word(word)));

            var word_2 = [10,2,1,23];
            Store.add(board, word_2);

            words = Store.list(board);
            assert(words[1].equals(new Word(word_2)));

            Store.clear();
        });
    });

    describe('mostSolved', function() {
        it('should return the word with the most solved cells in a board', function () {
            var board = 'xyz231b';
            var word_1 = [2, 21,'d',14,8];
            var word_2 = [1,14,4];
            Store.add(board, word_1);
            Store.add(board, word_2);

            var result = Store.mostSolved(board);

            assert(result.equals(new Word(word_1)));
            var word_3 = ['a', 'b', 6, 14, 3];
            Store.add(board, word_3);
            result = Store.mostSolved(board);

            assert(result.equals(new Word(word_3)));

            Store.clear();
        });
    });

    describe('update', function() {
       it ('should update all words in a board', function() {
           var board = '33ffa34b';
           var word_1 = [2, 21,'d','i','m'];
           var word_2 = [1,10,10,'o','w'];
           Store.add(board, word_1);
           Store.add(board, word_2);

           var result = Store.mostSolved(board);
           assert(result.equals(new Word(word_1)));

           // setting number 10 to equal 'l' means word_2 has 2 solved cells
           Store.update(board, 10, 'l');
           var result = Store.mostSolved(board);

           assert(result.equals(new Word(word_2)));

           Store.clear();
       });
    });

    describe('list', function() {
       it("should return null for unknown board", function() {
           var result = Store.list('unknown');
           assert(null == result);
       });

       it("should stores words keyed on board", function() {
           var board_1 = '33ffa34b';
           var word_1 = [2, 21,'d','i','m'];
           var board_2 = 'aa83f09d';
           var word_2 = [1,10,10,'o','w'];
           Store.add(board_1, word_1);
           Store.add(board_2, word_2);

           var list_1 = Store.list(board_1);
           assert(list_1[0].equals(new Word(word_1)));

           var list_2 = Store.list(board_2);
           assert(list_2[0].equals(new Word(word_2)));

       });
    });
});