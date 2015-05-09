var _ = require("underscore"),
    Word = require("./word");

/**
 * stores and retrieve words
 * all words are related to a board id string
 * should be updated to use a Board object to store each Board's cells
 */
var words = {};
var taken = {};

/**
 *
 * @param board the name of the board this word belongs to
 * @param word an array of cell numbers
 */
exports.add = function(board, word) {
    if (!words[board]){
        words[board] = [];
    }
    words[board].push(new Word(word));
};

/**
 * remove all words and all boards
 */
exports.clear = function() {
    words = {};
};

/**
 * @param board
 * @returns {{}}
 */
exports.list = function(board) {
    return words[board];
};

/**
 *  Returns the first Word found with the most solved cells
 *  where the Word is not completely solved
 * @param board
 */
exports.mostSolved = function(board) {

    var number = -1;
    var most_solved = null;

    _.each(words[board], function(word){
        if (!word.isSolved()) {
            if (word.numberSolved() > number) {
                number = word.numberSolved();
                most_solved = word;
            }
        }
    });

    return most_solved;
};

/**
 * @param board
 * @param number
 * @param letter
 */
exports.update = function(board, number, letter) {

    var solved = [];

    _.each(words[board], function(word){
        if (word.update(number, letter)){
            solved.push(word);
        }
    });

    _.each(taken[board], function(word){
        if (word.update(number, letter)){
            solved.push(word);
        }
    });

    return solved;
};

/**
 * Remove and return a word from the store
 * @param board
 * @param remove
 * @returns {word} | {null}
 */
exports.take = function(board, remove) {

    var found = false;
    _.each(words[board], function(word, index){
        if (word === remove) {
            found = true;
            words[board].splice(index, 1);
            if (!taken[board]){
                taken[board] = [];
            }
            taken[board].push(remove);
        }
    });

    return found ? remove : null;
};

/**
 *
 * @param board
 * @param word
 */
exports.restore = function(board, restore){

    _.each(taken[board], function(word, index){
        if (word === restore) {
            taken[board].splice(index, 1);
            words[board].push(restore);
        }
    });
};