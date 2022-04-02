const config = require(`../../config/env/${
  process.env.NODE_ENV ? process.env.NODE_ENV : "local"
}.env.json`);
const randomstring = require("randomstring");
const NodeCache = require("node-cache");

const STRING_LENGTH = config.RANDOMSTRING.LENGHT ? config.RANDOMSTRING : 10;
const CACHETTL = config.CACHE.TTL ? config.CACHE.TTL : 100;
const CACHEMAXKEYSIZE = config.CACHE.CACHEMAXKEYSIZE ? config.CACHE.CACHEMAXKEYSIZE : 50;

const cache = new NodeCache({ stdTTL: CACHETTL });


cache.on('expired', function( key, value ){
    console.log('key',key,value);
    const randomString = randomstring.generate(STRING_LENGTH);
    cache.set(key, randomString);
});

/** *********************************** Check Key Exist ********************************** **/

let checkKeyExistPayload = async (req, res, next ) => {
  
  try {

    const found = req.query.key ?? req.body.key ?? req.params.key;

    if ( found == undefined ) res.status(400).send("Please provide key");
    else {
      req.cacheKey = found;
      return next();
    }

  } catch ( err ) {
    res.status(400).send("Broken");
  }
};

/** ********************************* Check Value Exist in Cache ********************  **/

let addUpdateCacheRecord = async (req, res, next) => {

  try {

    const cacheKey = req.cacheKey;
    const randomString = randomstring.generate(STRING_LENGTH);
    cache.set(cacheKey, randomString);

    // Better to create a error and response message as helper
    let response = {
      message: "Successfully created/updated cache record",
      data: {
        key: cacheKey,
        value: randomString,
      },
    };

    res.status(200).send(response);

  } catch (err) {
    console.log("err", err);
    res.status(400).send("Broken");
  }
};

/** ********************************* Check Value Exist in Cache ********************  **/

let getSpecificCacheRecord = async (req, res, next) => {
  
  try {

    const cacheKey = req.cacheKey;
    let found = cache.get(cacheKey);

    // Better to create a error and response message as helper

    let response = {
      message: "Successfully fetched cache record",
      data: {
        key: cacheKey,
        value: "",
      },
    };

    if (found == undefined) {
      console.log("Cache Miss");
      const randomString = randomstring.generate(STRING_LENGTH);
      cache.set(cacheKey, randomString);
      response.data.value = randomString;
    } else {
      console.log("Cache Hit");
      cache.ttl(cacheKey, CACHETTL);
      response.data.value = found;
    }

    res.status(200).send(response);
  } catch (err) {
    console.log("err", err);
    res.status(400).send("Broken");
  }
};

/** ****************************** Get All Cache Keys  ******************************** **/

let getAllCacheKeys = async (req, res, next) => {
  try {

    const foundAllKeys = cache.keys();
    res.status(200).send({
      message: "Successfully fetched all cache keys",
      data: foundAllKeys,
    });
  } catch (err) {
    res.status(400).send("Broken");
  }
};

/** ****************************** Delete All Cache Keys  ******************************** **/

// The specific and all delete endpoint could be merge based on param we idenitfy they want to delete one if not we delete all.

let deleteAllCacheKeys = async (req, res, next) => {
  try {
    
    const deletedKeys = cache.flushAll();
    res.status(200).send({
      message: "Successfully delete cache keys",
      data: {},
    });
  } catch (err) {
    res.status(400).send("Broken");
  }
};

/** ******************************* Delete Specific Cache Record ***************************** **/

// For now expecting one could be array of keys want to delete depend on bussiness requirement

let deleteSpecificCacheRecords = async (req, res, next) => {

  try {

    const CacheKey = req.cacheKey;
    const isExist = cache.has(CacheKey);    
    if ( !isExist ) res.status(400).send("Please provide valid cache key");

    else { 
        cache.del(CacheKey);
        res.status(200).send({
            message: "Successfully delete specific cache keys",
            data: {},
          });
    }

  } catch (err) {
    res.status(400).send("Broken");
  }
};

/** ****************************** check Key Count Not Exceeded ****************************** **/

let isCacheSizeExceed = async (req, res, next ) => {

  try {

    const foundStats = cache.getStats();
    console.log('foundStats',foundStats);
    const foundCache = cache.has(req.cacheKey);
    // store the last accessed key and then delete the mimmal used cache key. 
    if ( foundStats.keys < CACHEMAXKEYSIZE || foundCache ) return next();
    else res.status(400).send("Reached maximum cache limit");
  } catch (err) {
    res.status(400).send("Broken");
  }
};


module.exports = {
  checkKeyExistPayload,
  addUpdateCacheRecord,
  getAllCacheKeys,
  getSpecificCacheRecord,
  deleteAllCacheKeys,
  deleteSpecificCacheRecords,
  isCacheSizeExceed,
  isCacheSizeExceed
};
