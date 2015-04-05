var _ = require("underscore"),
    Word = require("./word");

/**
 * store and retrieve words
 * all words are related to a board id string
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
 */
exports.mostSolved = function(board) {

    var number = -1;
    var most_solved = null;

    _.each(words[board], function(element){
        if (element.numberSolved() > number){
            number = element.numberSolved();
            most_solved = element;
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