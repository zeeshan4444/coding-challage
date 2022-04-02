const express = require('express');
const app = express();
const config = require(`./config/env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'local' }.env.json`);
const routes = require('./config/routes_loader');

let handleErrors = async (err, req, res, next) => {
  try {
    if (err.type == "entity.parse.failed") {
      res
        .status(400)
        .send({ code: "0000", message: "Buddy! Please Enter Correct Json." });
    }
  } catch (err ){ 
    res.status(400).send('Something went wrong');
  }  
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(handleErrors);


app.get('/', (req, res) => {
  res.status(200).send('Cache App Health is Ok!')
})

app.listen(config.APP.PORT, () => {
  console.log(`Cache app listening on port ${config.APP.PORT}`)
})