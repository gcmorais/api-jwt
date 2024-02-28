const express = require("express");
require("express-async-errors");

const routes = require("./routes");
const cors = require("./app/middlewares/cors");
const errorHandler = require("./app/middlewares/errorHandler");

const app = express();

const port = process.env.PORT || 5174;

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log("Server started at http://localhost:5174"));
