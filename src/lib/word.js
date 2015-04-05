var _ = require("underscore");

/**
 */
function Word(cells) {
    this.cells = cells;
}

/**
 * Test for equality with another Word object
 *
 * @param word
 * @returns {boolean}
 */
Word.prototype.equals = function(word) {
    return this.cells == word.cells;
};

/**
 * Return the number of solved cells in the word
 */
Word.prototype.numberSolved = function() {

    var solved = 0;
    _.each(this.cells, function(element, index, list) {
        if(!_.isNumber(element)) {
            solved++;
        }
    });
    return solved;
};

/**
 * Pattern generation should be in a separate class
 * So all solved cells can be used
 * @returns {string}
 */
Word.prototype.asPattern = function() {
    var pattern = '';
    _.each(this.cells, function(element, index, list) {
        if(!_.isNumber(element)) {
            pattern = pattern + element;
        } else {
            pattern = pattern + '.';
        }
    });
    return pattern;
};

/**
 *
 * @param number
 * @param letter
 */
Word.prototype.update = function(number, letter) {
    _.each(this.cells, function(element, index, list) {
        if(number == element) {
            list[index] = letter;
        }
    });
};

Word.prototype.length = function() {
    return this.cells.length;
}

module.exports = Word;