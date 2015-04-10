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
    logger.info('most-solved:  cell.updated board: ' + fact.board + ' number ' + fact.data.body.number + ' letter ' + fact.data.body.letter);

    // 1) update local store
    Store.update(fact.board, fact.data.body.number, fact.data.body.letter);

    // 2) get most solved
    var most_solved = Store.mostSolved(fact.board);

    if (!most_solved) {
        logger.info("no most solved word available");
        return;
    }

    // 3) generate pattern
    // need a pattern generator & a store of all solved letters, so we can rule out certain letters
    var pattern_endpoint = 'http://pattern/regexp/' + fact.board;

    request({url: pattern_endpoint, method: 'POST', json: true, body: most_solved.getCells()}, function(err, response, response_body) {
        if (err) {
            throw err;
        }

        var pattern =  response_body['pattern'];
        var length = most_solved.length();

        logger.info("pattern = " + pattern);

        // 4) use dictionary to find possible matches
        // GET http://dictionary/words?pattern=ptn&length=x
        var endpoint = 'http://dictionary/words?pattern=' + pattern + '&length=' + length;

        logger.info("endpoint = " + endpoint);

        request(endpoint, function (err, response, response_body) {
            if (err) {
                throw err;
            }

            // deal with response, this will be a json array
            var matches = JSON.parse(response_body);
            logger.info("most-solved: success : " + response_body);
            // potentially update affected words & cells
            // if matches.length == 1 then update all local words and publish cell.updated facts

            if (1 == matches.length) {
                wordSolved(pub, fact, most_solved, matches[0]);
            }
        });
    });
};

function wordSolved(pub, fact, most_solved, match) {

    // resolve the numbers
    _.each(most_solved.getCells(), function(cell, index){
        if (_.isFinite(cell)){
            // get char at index from match
            var char = match.charAt(index);
            // 5) update local store
            Store.update(fact.board, cell, char);
            // 6) publish facts
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