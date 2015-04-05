var logger = require('./logger'),
    Store = require('./word_store'),
    request = require('request');

/**
 * @param pub socket to write facts back to
 * @param fact a fact object
 */
exports.handleFact = function(pub, fact) {

    logger.info("most-solved new fact: " + fact.name);

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
    Store.update(fact.data.body.number, fact.data.body.letter);

    // get most solved
    var most_solved = Store.mostSolved();

    // need a pattern generator & a store of all solved letters, so we can rule out certain letters
    var pattern =  most_solved.asPattern();
    var length = most_solved.length();

    // use dictionary to find possible matches
    // GET http://dictionary/words?pattern=ptn&length=x
    var endpoint = 'http://dictionary/words?pattern=' + pattern + '&length=' + length;

    request(endpoint, function(err, response, response_body) {
        if (err) {
            logger.error("most-solved: " + err);
        } else {
            // deal with response, this will be a json array
            var matches = JSON.parse(response_body);
            logger.info("most-solved: " + response_body);
            // potentially update affected words & cells
            // publish new facts if cells have been updated
        }
    });
}