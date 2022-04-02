const config = require(`../../config/env/${
  process.env.NODE_ENV ? process.env.NODE_ENV : "local"
}.env.json`);
const randomstring = require("randomstring");
const NodeCache = require("node-cache");

const STRING_LENGTH = config.RANDOMSTRING.LENGHT ? config.RANDOMSTRING : 10;
const CACHETTL = config.CACHE.TTL ? config.CACHE.TTL : 100;

const cache = new NodeCache({ stdTTL: CACHETTL });

// cache.on( "expired", function( key, value ){
//     console.log('key',key,value);
// });

/** ********************************* Check Value Exist in Cache ********************  **/

let getSpecificCacheRecord = async (req, res, next) => {
  try {
    if (!req.query.hasOwnProperty("key") || req.query.key == undefined) {
      res.status(400).send("Please provide key");
    }

    const cacheKey = req.query.key;
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
    const foundAllKeys = cache.flushAll();
    res.status(200).send({
      message: "Successfully delete all cache keys",
      data: {},
    });
  } catch (err) {
    res.status(400).send("Broken");
  }
};

/** ******************************* Delete Specific Cache Record ***************************** **/

// For now expecting one could be array of keys want to delete.

let deleteSpecificCacheRecords = async (req, res, next) => {

  try {

    const CacheKey = req.params.key;
    const isExist = cache.has(CacheKey);
    
    if ( !isExist ) res.status(400).send("Please provide valid cahe key");
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

/** ****************************** Add Cache Record  ******************************** **/

let addCacheRecord = async (req, res, next) => {
  try {
  } catch (err) {}
};

module.exports = {
  getAllCacheKeys,
  getSpecificCacheRecord,
  addCacheRecord,
  deleteAllCacheKeys,
  deleteSpecificCacheRecords,
};
