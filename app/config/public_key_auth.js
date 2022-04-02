const config = require(`./env/${
    process.env.NODE_ENV ? process.env.NODE_ENV : "local"
  }.env.json`);

  
let checkPublicKey = async (req, res, next ) => {

    try {
    
        const appPublicKey  =  config.PUBLICKEY;
        const apiKey = req.headers['x-api-key'] ?  req.headers['x-api-key'] : 'abcdefghij' ; 
        if ( appPublicKey === apiKey ) {
            return next();
        } else  res.status(404).send("Forbiden Access!");

    } catch (err) {
        console.log(err);
        res.status(400).send("Broken");
    }
};


module.exports = {
    checkPublicKey
}