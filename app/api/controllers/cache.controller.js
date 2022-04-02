
const config = require(`../../config/env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'local' }.env.json`);
const randomstring = require("randomstring");
const NodeCache = require( "node-cache" );

const STRING_LENGTH = config.RANDOMSTRING.LENGHT ? config.RANDOMSTRING : 10;
const CACHETTL = config.CACHE.TTL ? config.CACHE.TTL: 100;

const cache = new NodeCache( { stdTTL: CACHETTL } );


/** ********************************* Check Value Exist in Cache ********************  **/


let checkCacheKey = async (req, res, next ) => {
    
    try {
        
        if ( !req.query.hasOwnProperty('key') || req.query.key == undefined ) {
            res.status(400).send('Please provide key');
        };

        const cacheKey = req.query.key; 
        let found = cache.get(cacheKey);

        // Better to create a error and response message as helper
        
        let response = {
            key: cacheKey,
            value: ''
        };

        if ( found == undefined ) {
            console.log('Cache Miss');
            const randomString = randomstring.generate(STRING_LENGTH);
            cache.set(cacheKey, randomString);
            response.value = randomString;

        } else {
            console.log('Cache Hit');
            response.value = found;
        }
        
        res.status(200).send(response);


    } catch ( err ) {
        console.log('err', err);
        res.status(400).send('Broken');
    }
};

/** ****************************** Get Specific Cache Record  ******************************** **/

let getSpecificCacheRecord = async (req, res, next ) => {
    
    try {

    } catch ( err ) {

    }
};

/** ****************************** Add Cache Record  ******************************** **/

let addCacheRecord = async (req, res, next ) => {
    
    try {

    } catch ( err ) {

    }
};

/** ******** */

module.exports = {
    checkCacheKey,
    getSpecificCacheRecord,
    addCacheRecord
};