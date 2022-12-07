import {addMeal, getMeals, getMealWithName} from "./mealEngine.js";
import {getIngredients, addIngredient} from "./ingredientEngine.js";
import {getUnits} from "./unitEngine.js";
import express from "express";
import cors from "cors";
import _ from "lodash";
import bodyParser from "body-parser";
import { addMealIngredient } from "./mealIngredientEngine.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.post("/meal", async (req, res) => {
    console.log("Demande pour POST meal");
    res.setHeader('Content-Type', 'application/json');
    let result = true;
    addMeal(req.body.newMeal)
    .then(created => {
        if(created) {
            getMealWithName(req.body.newMeal.name)
            .then(newMeal => {
                req.body.newMeal.ingredients.forEach(element => {
                    let addNewMI = addMealIngredient(newMeal[0].PLATE_ID, element);
                    if( !addNewMI) result = false;
                });
            });
        }
    });
    res.end(JSON.stringify({"result": result}));
});

/*app.post("/mealIngredient", async (req, res) => {
    console.log("Demande pour POST mealIngredient");
    res.setHeader('Content-Type', 'application/json');
    let result = await addMealIngredient(req.body.newMealIngredient);
    res.end(JSON.stringify({"result": result}));
});*/

app.get("/ingredients", async (req, res) => {
    console.log("Demande pour GET ingredients");
    res.setHeader('Content-Type', 'application/json');
    let result = await getIngredients();
    res.end(JSON.stringify(result));
});

app.get("/meal/:mealName", async (req, res) => {
    console.log("Demande pour GET meal mealName");
    res.setHeader('Content-Type', 'application/json');
    let result = await getMealWithName(req.params.mealName);
    res.end(JSON.stringify({"result":result}));
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