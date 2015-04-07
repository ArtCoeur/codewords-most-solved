var NewWordHandler = require('./new_word_handler'),
    UpdatedCellHandler = require('./new_word_handler');

/**
 * @param pub socket to write facts back to
 * @param fact a fact object
 */
module.exports.newFact = function(pub, fact) {
    if (fact.name == 'word.new') {
        NewWordHandler.handleFact(pub,fact);
    }  else if (fact.name == 'cell.updated') {
        UpdatedCellHandler.handleFact(pub, fact);
    }
};
