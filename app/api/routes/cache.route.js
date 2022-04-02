const Router = require("express");
const cacheRouter = Router();
const cacheController = require("../controllers/cache.controller");
const authController = require("../../config/public_key_auth");

/** **********************************  ********************************************* **/

// Post is recommended but one api we are either adding/updating so choose Put  
cacheRouter.put(
    "/records", 
    authController.checkPublicKey,
    cacheController.getSpecificCacheRecord
);

/** ********************************** Get Specific Record   ********************************************* **/

cacheRouter.get(
    "/records", 
    authController.checkPublicKey,
    cacheController.getSpecificCacheRecord,
);

/** ********************************** Get All keys ********************************************* **/

cacheRouter.get(
    "/keys", 
    authController.checkPublicKey,
    cacheController.getAllCacheKeys,
);

/** ********************************** Delete All keys ********************************************* **/

cacheRouter.delete(
    "/keys", 
    authController.checkPublicKey,
    cacheController.deleteAllCacheKeys,
);

/** ********************************** Delete All keys ********************************************* **/

cacheRouter.delete(
    "/keys", 
    authController.checkPublicKey,
    cacheController.deleteAllCacheKeys,
);

module.exports = cacheRouter;