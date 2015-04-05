var logger = require('./logger'),
    Store = require('./word_store');

/**
 * @param pub socket to write facts back to
 * @param fact a fact object
 */
exports.handleFact= function(pub, fact) {
    if (fact.name == 'word.new') {
        handleNewWord(fact);
    }  else if (fact.name == 'cell.updated') {
        handleUpdatedCell(fact);
    }
};

/**
 * @param fact A fact object
 */
function handleNewWord(fact) {
    // add word to the word store
    Store.add(fact.data.body.cells);
}

function handleUpdatedCell(fact) {
    // update all affected words
    // get most solved
    // use dictionary to find possible matches
    // potentially update affected words
    // publish fact
}