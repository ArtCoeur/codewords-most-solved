var logger = require('./logger'),
    Store = require('./word_store'),
    request = require('request'),
    _ = require('underscore');

/**
 * should just route to 'controllers'
 */

/**
 * @param pub socket to write facts back to
 * @param fact a fact object
 */
exports.handleFact = function(pub, fact) {

    logger.info("most-solved new fact: name: " + fact.name + ' board: ' + fact.board);

    if (fact.name == 'word.new') {
        handleNewWord(fact);
    }  else if (fact.name == 'cell.updated') {
        handleUpdatedCell(pub, fact);
    }
};

/**
 * @param fact A fact object
 */
function handleNewWord(fact) {
    // add word to the word store
    Store.add(fact.board, fact.data.body.cells);
}

function handleUpdatedCell(pub, fact) {
    // update all affected words
    logger.info('most-solved update cell, board: ' + fact.board + ' number ' + fact.data.body.number + ' letter ' + fact.data.body.letter);
    Store.update(fact.board, fact.data.body.number, fact.data.body.letter);

    // get most solved
    var most_solved = Store.mostSolved(fact.board);

    if (!most_solved) {
        logger.info("no most solved word : available words = " + Store.list(fact.board));
        return;
    }

    // need a pattern generator & a store of all solved letters, so we can rule out certain letters
    // var pattern_endpoint = 'http://pattern/pattern/' + fact.board;
    // var body = JSON.stringify(most_solved.getCells())

    var pattern =  most_solved.asPattern();
    var length = most_solved.length();

    logger.info("pattern = " + pattern);

    // use dictionary to find possible matches
    // GET http://dictionary/words?pattern=ptn&length=x
    var endpoint = 'http://dictionary/words?pattern=' + pattern + '&length=' + length;
    logger.info("endpoint = " + endpoint);

    request(endpoint, function(err, response, response_body) {
        if (err) {
            logger.error("most-solved: error : " + err);
        } else {
            // deal with response, this will be a json array
            var matches = JSON.parse(response_body);
            logger.info("most-solved: success : " + response_body);
            // potentially update affected words & cells
            // if matches.length == 1 then update all local words and
            if (1 == matches.length){
                var match = matches[0];

                // resolve the numbers
                _.each(most_solved.getCells(), function(cell, index){
                    if (_.isFinite(cell)){
                        // get char at index from match
                        var char = match.charAt(index);
                        Store.update(fact.board, cell, char);
                        pub.write(JSON.stringify({
                                board: fact.board,
                                name: 'cell.updated',
                                data: {
                                    body: {
                                        number: cell,
                                        letter: char
                                    },
                                    type: 'application/json'
                                }
                            })
                        );
                    }
                });
            }
        }
    });
}