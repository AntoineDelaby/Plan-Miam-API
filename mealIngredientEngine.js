import sqlite3 from 'sqlite3';
import { getIngredientWithName } from './ingredientEngine.js';
import { getMealWithName } from './mealEngine.js';

let databasePath = 'planMiamDb.db';
//MI veut dire Meal Ingredient (ou ingrédient du plat)
let DOES_MI_EXIST = 'SELECT * FROM PLATE_INGREDIENT WHERE PLATE_ID = (SELECT PLATE_ID FROM PLATE WHERE PLATE_NAME = ?) AND INGREDIENT_ID = (SELECT INGREDIENT_ID FROM INGREDIENT WHERE INGREDIENT_NAME = ?)';
let INSERT_MI = 'INSERT INTO PLATE_INGREDIENT VALUES (?, ?, ?, ?, ?)';

function getConnection() {
    let database = new sqlite3.Database(databasePath, (err) => {
        if (err) {
            return console.error(`Erreur lors de la création de la base de données : ${err.message}`);
        }
        console.log('Connecté à la base de données.');
        });
    return database;
}

function closeConnection(database) {
    database.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connexion fermée.');
        });
}

async function existingMealIngredient(mealName, ingredientName) {
    return new Promise((resolve, reject) => {
        const db = getConnection();

        db.all(DOES_MI_EXIST, [mealName, ingredientName], (err, rows) => {
            if (err) {
                closeConnection(db);
                reject(err);
            }
            resolve(rows);
        });
    })
}

export async function addMealIngredient(mealId, newMealIngredient) {
    console.log(mealId);
    console.log(newMealIngredient);

    let ingredient = await getIngredientWithName(newMealIngredient.ingredient);
    let result = await existingMealIngredient(mealId, ingredient[0]['INGREDIENT_ID']);
    console.log(ingredient);
    console.log(result);

    if((result.length != 0)) {
        console.log("DE INGLEDIENT ALLEADY EXISTS");
        return false;
    }else {
        return new Promise((resolve, reject) => {
            console.log("TRYING TO INSERT MEAL INGREDIENT")
            const db = getConnection();
            db.all(INSERT_MI, [mealId, ingredient[0]['INGREDIENT_ID'], newMealIngredient.quantity, newMealIngredient.unit, null], (err, rows) => {
                if (err) {
                closeConnection(db);
                reject(err);
                }
                resolve(true);
            });
        });
    }
}