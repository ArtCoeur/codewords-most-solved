var _ = require("underscore"),
    Word = require("./word");

/**
 * stores and retrieve words
 * all words are related to a board id string
 * should be updated to use a Board object to store each Board's cells
 */
var words = {};

/**
 *
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
 *
 * @returns {{}}
 */
exports.list = function(board) {
    return words[board];
}

/**
 *  Returns the first Word found with the most solved cells
 *  where the Word is not completely solved
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
 *
 * @param number
 * @param letter
 */
exports.update = function(board, number, letter) {
    _.each(words[board], function(element){
        element.update(number, letter);
    });
};