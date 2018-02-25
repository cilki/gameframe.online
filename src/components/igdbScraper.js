/* igdb scraper that reports to console log with a json output.
 *
 * Documentation
 * https://github.com/igdb/igdb-api-node
 * 
 * Problem with webpack's .web, .fs, .lts
 * Tried to fix through webpack configuration,
 * but I don't quite understand the syntax needed.
 */

import igdb from 'igdb-api-node';

const client = igdb("API KEY"),
    log = response => {
        console.log(response.url, JSON.stringify(response.body, null));
    };
	
/*Search for companies with 'rockstar' in their name. 
Return up to five results sorted by name in descending order */
client.companies({
    field: 'name',
    limit: 5,
    offset: 0,
    order: 'name:desc',
    search: 'rockstar'
}, [
    'name',
    'logo'
]).then(log);	

