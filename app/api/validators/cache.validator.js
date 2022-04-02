const { body, validationResult } = require("express-validator");

let addUpdateCacheRule = async ( ) => {
  return [
    body('key').not().isEmpty().trim(),
 ]
 
};

let valdateAddUpdateCachePayload = async (req, res, next ) => {
  try {
    

      const errors = validationResult(req);
      console.log('errors',errors);
      if (errors.isEmpty()) {
        return next()
      }
      const extractedErrors = []
      errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    
      return res.status(400).json({
        errors: extractedErrors,
      })

  } catch (err) {
    console.log("err", err);
    return res.status(400).send("Error while validation");
  }
};


module.exports = {
    addUpdateCacheRule,
    valdateAddUpdateCachePayload,
};
