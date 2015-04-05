/**
 * store and retrieve words
 */

var words = {};

/**
 *
 * @param word an array of cell numbers
 */
exports.add = function(word) {

    var len = word.length;
    if (!words[len]){
        words[len] = [];
    }
    words[len].push(word);
};

exports.list = function() {
    return words;
}

/**
 *
 */
exports.mostSolved = function() {

};

/**
 *
 * @param number
 * @param letter
 */
exports.setCellLetter = function(number, letter) {

};