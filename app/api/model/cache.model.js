const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
    key: String,
    value: String
}, { timestamps: true });

const cacheModel = mongoose.model('Cache', cacheSchema);

module.exports  = cacheModel;