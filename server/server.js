require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/db");
const errorHandler = require("./middlewares/errorHandlers");
const analyticsRoutes = require("./routes/analytics.routes");

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/analytics",analyticsRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5001;

app.listen(PORT,()=>{
    console.log("Server Started on ",PORT);
})
