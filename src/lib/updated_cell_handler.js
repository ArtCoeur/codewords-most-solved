var logger = require('./logger'),
    Store = require('./word_store'),
    request = require('request'),
    _ = require('underscore');

/**
 *
 * @param pub socket to write facts back to
 * @param fact a fact object
 */
module.exports.handleFact = function(pub, fact) {

    // update all affected words
    logger.info('cell.updated ' + JSON.stringify(fact));

    // 1) update local store
    Store.update(fact.board, fact.data.body.number, fact.data.body.letter);

    // 2) get most solved word
    var current = Store.mostSolved(fact.board);

    if (!current) {
        logger.info("no words available to solve");
        return;
    }

    current = Store.take(fact.board, current);

    // 3) generate pattern
    // need a pattern generator & a store of all solved letters, so we can rule out certain letters
    var pattern_endpoint = 'http://pattern/regexp/' + fact.board;

    request({url: pattern_endpoint, method: 'POST', json: true, body: current.getCells()}, function(err, response, response_body) {
        if (err) {
            // push the current word back into the store before throwing the error
            Store.restore(fact.board, current);
            throw err;
        }

        logger.info("pattern = " + response_body['pattern']);

        // 4) use dictionary to find possible matches
        // GET http://dictionary/words?pattern=ptn&length=x
        var endpoint = 'http://dictionary/words?pattern=' + response_body['pattern'] + '&length=' + current.length();

        logger.info("endpoint = " + endpoint);

        request(endpoint, function (err, response, response_body) {

            // push the current word back into the store
            Store.restore(fact.board, current);

            if (err) {
                throw err;
            }

            // deal with response, this will be a json array
            var matches = JSON.parse(response_body);
            logger.info("success : " + response_body);

            // if matches.length == 1 then update all local words and publish cell.updated facts
            if (1 == matches.length) {
                wordSolved(pub, fact.board, current, matches[0]);
            }
        });
    });
};

/**
 * resolve the numbers into letters
 * @param pub
 * @param fact
 * @param word
 * @param match
 */
function wordSolved(pub, board, word, match) {
    _.each(word.getCells(), function(cell, index){
        logger.info("wordSolved : " + cell);
        if (_.isFinite(cell)){
            // get char at index from match
            var char = match.charAt(index);
            // 5) update local store
            Store.update(board, cell, char);
            // 6) publish a fact
            pub.write(JSON.stringify({
                    board: board,
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