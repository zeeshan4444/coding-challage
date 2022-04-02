const Router = require("express");
const routes = Router();
const cacheRouter = require("../api/routes/cache.route");

const version = "/api";

routes.use(`${version}/cache`, cacheRouter);

module.exports = routes;