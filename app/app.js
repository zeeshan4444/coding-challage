const express = require('express');
const app = express();
const config = require(`./config/env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'local' }.env.json`);


app.get('/', (req, res) => {
  res.send('Cache App Health is Ok!')
})

app.listen(config.APP.PORT, () => {
  console.log(`Cache app listening on port ${config.APP.PORT}`)
})