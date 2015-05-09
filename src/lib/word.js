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

Word.prototype.isSolved = function() {
    return this.numberSolved() == this.length();
};

/**
 * Pattern generation should be in a separate class
 * So all solved cells can be used
 * @returns {string}
 */
Word.prototype.asPattern = function() {
    var pattern = '';
    _.each(this.cells, function(element) {
        if(!_.isFinite(element)) {
            pattern = pattern + element;
        } else {
            // be more sophisticated with the pattern generation
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
            list[index] = letter.toLowerCase();
        }
    });
    
    return this.isSolved();
};

Word.prototype.length = function() {
    return this.cells.length;
};

Word.prototype.getCells = function() {
    return this.cells;
};

module.exports = Word;