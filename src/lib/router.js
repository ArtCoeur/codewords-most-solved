var logger = require('./logger');

/**
 * @param pub socket to write facts back to
 * @param fact fact object
 */
exports.handleFact= function(pub, fact) {
    if (fact.name == 'word.new'){
        handleNewWord(pub, fact);
    }
};

/**
 * @param pub socket to write facts back to
 * @param fact fact object
 */
function handleNewWord(pub, fact) {

    var word = new BoardParser(fact.data.body.cells);
    // add word to the word store
}