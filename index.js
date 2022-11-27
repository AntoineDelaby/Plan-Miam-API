import {getMeals} from "./mealEngine.js"
import {getIngredients, addIngredient} from "./ingredientEngine.js"
import {getUnits} from "./unitEngine.js"
import fs from "fs/promises";
import express from "express";
import cors from "cors";
import _ from "lodash";

const app = express();
app.use(cors());

app.get("/testWorking", (req, res) => {
    console.log("Demande pour GET testWorking");
    res.send("It is working !");
});

app.get("/meals", async (req, res) => {
    console.log("Demande pour GET meals");
    res.setHeader('Content-Type', 'application/json');
    let result = await getMeals();
    res.end(JSON.stringify(result));
});

app.get("/ingredients", async (req, res) => {
    console.log("Demande pour GET ingredients");
    res.setHeader('Content-Type', 'application/json');
    let result = await getIngredients();
    res.end(JSON.stringify(result));
});

app.post("/ingredients/:ingredientName", async (req, res) => {
    console.log("Demande pour POST ingredients");
    res.setHeader('Content-Type', 'application/json');
    let result = await addIngredient(req.params.ingredientName);
    res.end(JSON.stringify({"result":result}));
});

app.get("/units", async (req, res) => {
    console.log("Demande pour GET units");
    res.setHeader('Content-Type', 'application/json');
    let result = await getUnits();
    res.end(JSON.stringify(result));
});

const port = 8888;
app.listen(port, console.log(`API server is listening on port ${port} ...`));