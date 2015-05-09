var _ = require("underscore");

/**
 */
function Word(cells) {
    this.cells = _.map(cells, function(cell) {
        return cell.toString().toLowerCase();
    });
}

/**
 * Test for equality with another Word object
 *
 * @param word
 * @returns {boolean}
 */
Word.prototype.equals = function(word) {
    _.each(this.cells, function(cell, index){
        if (cell != word.cells[index]){
            return false;
        }
    });
    return true;
};

/**
 * Return the number of solved cells in the word
 * @returns {integer}
 */
Word.prototype.numberSolved = function() {

    var solved = 0;
    _.each(this.cells, function(element) {
        if(!_.isFinite(element)) {
            solved++;
        }
    });
    return solved;
};

/**
 *
 * @returns {boolean}
 */
Word.prototype.isSolved = function() {
    return this.numberSolved() == this.length();
};

/**
 *
 * @param number
 * @param letter
 * @returns {boolean}
 */
Word.prototype.update = function(number, letter) {

    var contains = false;

    _.each(this.cells, function(element, index, list) {
        if(number == element) {
            list[index] = letter.toLowerCase();
            contains = true;
        }
    });

    return contains ? this.isSolved() : false;
};

/**
 *
 * @returns {integer}
 */
Word.prototype.length = function() {
    return this.cells.length;
};

/**
 *
 * @returns {array}
 */
Word.prototype.getCells = function() {
    return this.cells;
};

/**
 *
 * @returns {string}
 */
Word.prototype.toString = function() {
    return this.cells.join('');
};

module.exports = Word;