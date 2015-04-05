var _ = require("underscore"),
    Word = require("./word");

/**
 * store and retrieve words
 */

var words = [];

/**
 *
 * @param word an array of cell numbers
 */
exports.add = function(word) {
    words.push(new Word(word));
};

exports.clear = function() {
    words = [];
};

/**
 *
 * @returns {{}}
 */
exports.list = function() {
    return words;
}

/**
 *  Returns the first Word found with the most solved cells
 */
exports.mostSolved = function() {

    var number = -1;
    var most_solved = null;

    _.each(words, function(element){
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
exports.update = function(number, letter) {
    _.each(words, function(element){
        element.update(number, letter);
    });
};