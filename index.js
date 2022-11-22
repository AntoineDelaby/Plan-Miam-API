import {getMeals} from "./mealEngine.js"
import {getIngredients} from "./ingredientEngine.js"
import fs from "fs/promises";
import express from "express";
import cors from "cors";
import _ from "lodash";

const app = express();
app.use(cors());

app.get("/testWorking", (req, res) => {
    res.send("It is working !");
});

app.get("/meals", async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let result = await getMeals();
    res.end(JSON.stringify(result));
});

app.get("/ingredients", async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let result = await getIngredients();
    res.end(JSON.stringify(result));
});

const port = 8888;
app.listen(port, console.log(`API server is listening on port ${port} ...`));