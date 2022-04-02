const Router = require("express");
const cacheRouter = Router();
const cacheController = require("../controllers/cache.controller");

/** ********************************** Create User ********************************************* **/

// Post is recommended but one api we are either adding/updating so choose Put  
cacheRouter.put(
    "/records", 
    cacheController.getSpecificCacheRecord
);

/** ********************************** Create User ********************************************* **/

cacheRouter.get(
    "/records", 
    cacheController.checkCacheKey,
    cacheController.getSpecificCacheRecord
);

module.exports = cacheRouter;