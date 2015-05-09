var Store = require('./word_store'),
    logger = require('./logger');

/**
 * Add a new word to the word store for this board
 *
 * @param pub socket to write facts back to
 * @param fact a fact object
 */
module.exports.handleFact = function(pub, fact) {
    logger.info("word.new board: " + fact.board);
    Store.add(fact.board, fact.data.body.cells);
}