import {getMeals} from "./mealEngine.js"
import fs from "fs/promises";
import express from "express";
import cors from "cors";
import _ from "lodash";

const app = express();

app.get("/testWorking", (req, res) => {
    res.send("It is working !");
});

app.get("/meals", (req, res) => {
    getMeals();
    res.send("Look at console");
});

const port = 8888;
app.listen(port, console.log(`API server is listening on port ${port} ...`));