const Router = require("express");
const cacheRouter = Router();
const cacheController = require("../controllers/cache.controller");
const authController = require("../../config/public_key_auth");

/** **********************************  ********************************************* **/

// Post is recommended but one api we are either adding/updating so choose Put  
cacheRouter.put(
    "/records", 
    authController.checkPublicKey,
    cacheController.checkKeyExistPayload,
    cacheController.addUpdateCacheRecord
);

/** ********************************** Get Specific Record   ********************************************* **/

cacheRouter.get(
    "/records", 
    authController.checkPublicKey,
    cacheController.checkKeyExistPayload,
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

/** ********************************** Delete Specific keys ********************************************* **/
// RFC 7231 section 4.3. 5 
cacheRouter.delete(
    "/keys/:key", 
    authController.checkPublicKey,
    cacheController.checkKeyExistPayload,
    cacheController.deleteSpecificCacheRecords,
);

module.exports = cacheRouter;