const config = require(`./env/${
    process.env.NODE_ENV ? process.env.NODE_ENV : "local"
  }.env.json`);

const mongoose = require('mongoose');
const url = config.DATABASE.CONNSTRING;
const cacheModel = require('../api/model/cache.model');


main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect(url);
        console.log('Connected!');
       
    } catch (err) {
        console.log(err);
        return err;
    }
}


module.export = mongoose;